import { useState, useRef, useEffect } from "react";
import { ImagePlus, X, Upload, Download, Lock, Unlock } from "lucide-react";
import { hideMessage, revealMessage, SecureStegApiError } from "../api/secureStegApi";
import pikachuFallback from "../assets/pokemon-pikachu.png";
import PokemonCorner from "./pokemon/PokemonCorner";

// ─────────────────────────────────────────────────────────────────────────
// STICKER / POKÉMON SOURCE SWITCH
//
// true  -> one random Pokémon for the Upload button on every refresh
// false -> one random local sticker from src/assets/stickers/
//          if the folder is empty, use the permanent local Pikachu fallback.
//
// The floating background animation remains unchanged.
// ─────────────────────────────────────────────────────────────────────────
const USE_POKEMON = true;

// true  -> floating stickers can be grabbed and dragged
// false -> floating stickers are not interactive
const INTERACTIVE_STICKERS = true;

const POKEMON_IDS = [
  25, 1, 7, 6, 39, 94, 133, 143, 54, 4, 152, 155, 158, 175, 183, 196, 197,
  2, 3, 5, 8, 9, 10, 13, 16, 19, 21, 23, 27, 29, 32, 35, 37, 41, 43, 46,
  48, 50, 52, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 83, 84, 86, 88,
  90, 92, 95, 96, 98, 100, 102, 104, 107, 108, 109, 111, 113, 114, 115, 116,
  118, 120, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 134, 135,
  136, 137, 138, 140, 142, 144, 145, 146, 147, 148, 149, 150, 151, 153, 154,
  156, 157, 159, 160, 161, 163, 165, 167, 170, 172, 173, 174, 176, 177, 179,
  181, 182, 184, 185, 186, 187, 190, 191, 193, 194, 198, 199, 200, 201, 202,
];

const stickerModules = import.meta.glob<string>(
  "../assets/stickers/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}",
  { eager: true, query: "?url", import: "default" },
);


const STICKER_URLS = Object.values(stickerModules);

function randomItem<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  return items[Math.floor(Math.random() * items.length)];
}

// One image is selected when the page loads.
// It therefore changes after a refresh, but does not change during the session.
function getUploadSticker() {
  if (USE_POKEMON) {
    // Pick exactly one random Pokémon on each page refresh.
    const randomPokemonId = randomItem(POKEMON_IDS) ?? 25;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomPokemonId}.png`;
  }

  // Pick exactly one random user sticker. If the folder is empty,
  // use the permanent local Pikachu fallback.
  return randomItem(STICKER_URLS) ?? pikachuFallback;
}

const UPLOAD_STICKER_URL = getUploadSticker();

// ─────────────────────────────────────────────────────────────────────────
// Floating background source.
// USE_POKEMON = true  -> original online Pokémon artwork
// USE_POKEMON = false -> your local stickers
//
// The original 151-slot animation, positions, sizes, timing and drift are
// intentionally unchanged.
// ─────────────────────────────────────────────────────────────────────────
const STICKER_SLOT_COUNT = 151;
const STICKER_SLOTS = Array.from({ length: STICKER_SLOT_COUNT }, (_, i) => i);

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

// New random Pokémon order on every page refresh.
const RANDOM_POKEMON_IDS = shuffled(POKEMON_IDS);

function getFloatingImageSource(index: number) {
  if (USE_POKEMON) {
    const id = RANDOM_POKEMON_IDS[index % RANDOM_POKEMON_IDS.length];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  return STICKER_URLS.length > 0
    ? STICKER_URLS[index % STICKER_URLS.length]
    : null;
}

function getStickerConfig(index: number) {
  const h = (index * 2654435761) >>> 0;
  const left = ((h % 94) + 1);
  const delay = ((h >> 4) % 220) / 10;
  const duration = 10 + ((h >> 8) % 80) / 10;
  const size = 55 + ((h >> 12) % 55);
  const drift = ((h >> 16) % 40) - 20;
  const src = getFloatingImageSource(index);

  return {
    index,
    src,
    left: `${left}%`,
    delay: `${delay}s`,
    duration: `${duration}s`,
    size,
    drift,
  };
}

const CONFIGS = USE_POKEMON ? [] : STICKER_SLOTS.map((i) => getStickerConfig(i));

type Mode = "hide" | "reveal";

export default function App() {
  const [mode, setMode] = useState<Mode>("hide");
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [revealedMessage, setRevealedMessage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Background sticker dragging.
  // While held, the sticker follows the mouse. Releasing it removes the
  // temporary position and lets the normal floating animation start again.
  const [draggedSticker, setDraggedSticker] = useState<{
    index: number;
    left: number;
    top: number;
  } | null>(null);

  // Exact position where a sticker was released.
  const [releasedSticker, setReleasedSticker] = useState<{
    index: number;
    left: number;
    top: number;
  } | null>(null);

  const dragRef = useRef<{
    index: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const handleStickerPointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (!INTERACTIVE_STICKERS) return;

    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    // Keep the browser from creating a text/image selection or native drag
    // gesture when the user clicks the same sticker repeatedly.
    window.getSelection?.()?.removeAllRanges();

    setReleasedSticker((current) =>
      current?.index === index ? null : current
    );

    dragRef.current = {
      index,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };

    target.setPointerCapture?.(event.pointerId);

    setDraggedSticker({
      index,
      left: rect.left,
      top: rect.top,
    });
  };

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!dragRef.current) return;

      setDraggedSticker((current) => {
        if (!current || current.index !== dragRef.current?.index) {
          return current;
        }

        return {
          ...current,
          left: event.clientX - dragRef.current.offsetX,
          top: event.clientY - dragRef.current.offsetY,
        };
      });
    };

    const handlePointerUp = () => {
      if (!dragRef.current) return;

      const released = draggedSticker;
      dragRef.current = null;

      if (released) {
        // Do NOT reset it to bottom. Start its upward flight from here.
        setReleasedSticker(released);
      }

      setDraggedSticker(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [draggedSticker]);

  // Clean up any object URL we created for the result image.
  useEffect(() => {
    return () => {
      if (resultImageUrl) URL.revokeObjectURL(resultImageUrl);
    };
  }, [resultImageUrl]);

  const resetResults = () => {
    setError(null);
    setDone(false);
    if (resultImageUrl) URL.revokeObjectURL(resultImageUrl);
    setResultImageUrl(null);
    setRevealedMessage(null);
  };

  const switchMode = (next: Mode) => {
    if (next === mode || uploading) return;
    setMode(next);
    resetResults();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    resetResults();
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    resetResults();
    setSelectedFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    resetResults();
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const canSubmit =
    !uploading &&
    !!selectedFile &&
    !!key &&
    (mode === "reveal" || !!message);

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please attach an image first.");
      return;
    }
    if (!key) {
      setError("Please enter a key.");
      return;
    }
    if (mode === "hide" && !message) {
      setError("Please enter a message to hide.");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      if (mode === "hide") {
        const blob = await hideMessage(selectedFile, message, key);
        const url = URL.createObjectURL(blob);
        setResultImageUrl(url);
        setDone(true);
      } else {
        const text = await revealMessage(selectedFile, key);
        setRevealedMessage(text);
        setDone(true);
      }
    } catch (err) {
      const msg =
        err instanceof SecureStegApiError
          ? err.message
          : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = () => {
    if (!resultImageUrl) return;
    const a = document.createElement("a");
    a.href = resultImageUrl;
    const baseName = selectedFile?.name?.replace(/\.[^.]+$/, "") ?? "image";
    a.download = `${baseName}-encoded.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div
      className="relative size-full overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(110vh) translateX(0px) rotate(-4deg) scale(1); opacity: 0; }
          5%   { opacity: 1; }
          50%  { transform: translateY(0vh) translateX(var(--drift)) rotate(3deg) scale(1.03); opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translateY(-115vh) translateX(0px) rotate(-2deg) scale(0.95); opacity: 0; }
        }

        @keyframes floatFromGrab {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1.03);
            opacity: 1;
          }
          100% {
            transform: translateY(-115vh) translateX(var(--drift)) rotate(3deg) scale(1);
            opacity: 0;
          }
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.52);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255, 255, 255, 0.82);
          box-shadow:
            0 8px 48px rgba(100, 130, 200, 0.14),
            0 2px 12px rgba(100, 130, 200, 0.1),
            inset 0 1.5px 0 rgba(255, 255, 255, 0.95),
            inset 0 -1px 0 rgba(200, 220, 255, 0.15);
        }
        .glass-input {
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(200, 215, 240, 0.6);
          color: #1e293b;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .glass-input::placeholder { color: #94a3b8; }
        .glass-input:focus {
          background: rgba(255, 255, 255, 0.72);
          border-color: rgba(59, 130, 246, 0.45);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          outline: none;
        }
        .drop-zone {
          background: rgba(255, 255, 255, 0.38);
          border: 1.5px dashed rgba(148, 163, 184, 0.55);
          transition: background 0.2s, border-color 0.2s;
        }
        .drop-zone:hover {
          background: rgba(255, 255, 255, 0.6);
          border-color: rgba(59, 130, 246, 0.45);
        }
        .upload-btn {
          background: linear-gradient(135deg, #ffcb05 0%, #f59e0b 100%);
          border: 1px solid rgba(245, 158, 11, 0.5);
          box-shadow: 0 4px 20px rgba(245, 158, 11, 0.3), inset 0 1px 0 rgba(255,255,255,0.4);
          color: #1e293b;
          transition: transform 0.15s, box-shadow 0.15s;
          position: relative;
          overflow: visible;
        }
        .upload-btn:hover:not(:disabled) {
          box-shadow: 0 6px 28px rgba(245, 158, 11, 0.45), inset 0 1px 0 rgba(255,255,255,0.5);
          transform: translateY(-1px);
        }
        .upload-btn:active:not(:disabled) { transform: translateY(0px) scale(0.98); }
        .upload-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .pikachu-btn {
          position: absolute;
          bottom: -18px;
          right: -14px;
          width: 62px;
          height: 62px;
          pointer-events: none;
          filter: drop-shadow(0 3px 6px rgba(0,0,0,0.22));
          transition: transform 0.2s;
        }
        .upload-btn:hover:not(:disabled) .pikachu-btn {
          transform: translateY(-3px) rotate(5deg);
        }
        .mode-toggle-btn {
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .floating-sticker {
          will-change: transform, left, top;
          user-select: none;
          -webkit-user-select: none;
          -webkit-user-drag: none;
          -webkit-touch-callout: none;
        }
      `}</style>

      {/* Pastel gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(145deg, #dbeafe 0%, #ede9fe 38%, #fce7f3 68%, #e0f2fe 100%)",
        }}
      />

      {/* Floating personal stickers only when Pokémon mode is disabled */}
      {!USE_POKEMON && CONFIGS.map((c) =>
        c.src ? (
          <div
            key={`sticker-${c.index}`}
            className="floating-sticker absolute bottom-0 select-none" onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()}
            aria-hidden={!INTERACTIVE_STICKERS}
            onPointerDown={(event) =>
              handleStickerPointerDown(event, c.index)
            }
            style={
              draggedSticker?.index === c.index
                ? ({
                    position: "fixed",
                    left: draggedSticker.left,
                    top: draggedSticker.top,
                    bottom: "auto",
                    width: c.size,
                    zIndex: 50,
                    cursor: INTERACTIVE_STICKERS ? "grabbing" : "default",
                    touchAction: INTERACTIVE_STICKERS ? "none" : "auto",
                    userSelect: "none",
                  } as React.CSSProperties)
                : releasedSticker?.index === c.index
                ? ({
                    position: "fixed",
                    left: releasedSticker.left,
                    top: releasedSticker.top,
                    bottom: "auto",
                    width: c.size,
                    zIndex: 50,
                    cursor: INTERACTIVE_STICKERS ? "grab" : "default",
                    touchAction: INTERACTIVE_STICKERS ? "none" : "auto",
                    "--drift": `${c.drift}px`,
                    animation: "floatFromGrab 8s linear forwards",
                  } as React.CSSProperties)
                : ({
                    left: c.left,
                    width: c.size,
                    cursor: INTERACTIVE_STICKERS ? "grab" : "default",
                    touchAction: INTERACTIVE_STICKERS ? "none" : "auto",
                    animation: `floatUp ${c.duration} ${c.delay} infinite ease-in-out`,
                    "--drift": `${c.drift}px`,
                  } as React.CSSProperties)
            }
            onAnimationEnd={() => {
              if (releasedSticker?.index === c.index) {
                setReleasedSticker(null);
              }
            }}
          >
            <img
              src={c.src}
              alt=""
              draggable={false}
              loading="lazy"
              className="w-full h-auto object-contain"
              style={{
                filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.15))",
                pointerEvents: "none",
                userSelect: "none",
                WebkitUserDrag: "none",
                WebkitUserSelect: "none",
              }}
            />
          </div>
        ) : null,
      )}

      {/* Center glass card */}
      <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
        <div className="glass-card relative z-20 rounded-3xl w-full max-w-md p-8 flex flex-col gap-5 overflow-hidden pointer-events-auto">

          {/* Pokeball watermark top-right */}
          <div className="absolute -top-8 -right-8 pointer-events-none select-none" style={{ opacity: 0.07 }}>
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
              <circle cx="80" cy="80" r="78" stroke="#1e293b" strokeWidth="4"/>
              <path d="M2 80 Q80 80 158 80" stroke="#1e293b" strokeWidth="4"/>
              <path d="M2 80 A78 78 0 0 1 158 80" fill="#ef4444"/>
              <circle cx="80" cy="80" r="22" fill="white" stroke="#1e293b" strokeWidth="4"/>
              <circle cx="80" cy="80" r="11" fill="white" stroke="#1e293b" strokeWidth="3"/>
            </svg>
          </div>

          {/* Small decorative Pokeball bottom-left */}
          <div className="absolute -bottom-6 -left-6 pointer-events-none select-none" style={{ opacity: 0.05 }}>
            <svg width="100" height="100" viewBox="0 0 160 160" fill="none">
              <circle cx="80" cy="80" r="78" stroke="#1e293b" strokeWidth="4"/>
              <path d="M2 80 Q80 80 158 80" stroke="#1e293b" strokeWidth="4"/>
              <path d="M2 80 A78 78 0 0 1 158 80" fill="#ef4444"/>
              <circle cx="80" cy="80" r="22" fill="white" stroke="#1e293b" strokeWidth="4"/>
              <circle cx="80" cy="80" r="11" fill="white" stroke="#1e293b" strokeWidth="3"/>
            </svg>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-slate-800 text-2xl font-semibold tracking-tight leading-tight">
              {mode === "hide" ? "Write a Message" : "Reveal a Message"}
            </h1>
            <p className="text-slate-400 text-sm font-light">
              {mode === "hide"
                ? "Write something and attach an image."
                : "Attach an encoded image and enter its key."}
            </p>
          </div>

          {/* Divider with pokeball icon */}
          <div className="flex items-center gap-3 -mt-1">
            <div className="flex-1 h-px" style={{ background: "rgba(30,41,59,0.08)" }} />
            <svg width="14" height="14" viewBox="0 0 160 160" fill="none" style={{ opacity: 0.25 }}>
              <circle cx="80" cy="80" r="78" stroke="#1e293b" strokeWidth="10"/>
              <line x1="2" y1="80" x2="158" y2="80" stroke="#1e293b" strokeWidth="10"/>
              <path d="M2 80 A78 78 0 0 1 158 80" fill="#ef4444"/>
              <circle cx="80" cy="80" r="24" fill="white" stroke="#1e293b" strokeWidth="10"/>
              <circle cx="80" cy="80" r="10" fill="#1e293b"/>
            </svg>
            <div className="flex-1 h-px" style={{ background: "rgba(30,41,59,0.08)" }} />
          </div>

          {/* Hide / Reveal toggle */}
          <div
            className="glass-input flex items-center rounded-2xl p-1 text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <button
              type="button"
              onClick={() => switchMode("hide")}
              className="mode-toggle-btn flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2"
              style={{
                background: mode === "hide" ? "rgba(255,255,255,0.9)" : "transparent",
                color: mode === "hide" ? "#1e293b" : "#94a3b8",
                boxShadow: mode === "hide" ? "0 1px 4px rgba(100,130,200,0.18)" : "none",
              }}
            >
              <Lock size={13} /> Hide
            </button>
            <button
              type="button"
              onClick={() => switchMode("reveal")}
              className="mode-toggle-btn flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2"
              style={{
                background: mode === "reveal" ? "rgba(255,255,255,0.9)" : "transparent",
                color: mode === "reveal" ? "#1e293b" : "#94a3b8",
                boxShadow: mode === "reveal" ? "0 1px 4px rgba(100,130,200,0.18)" : "none",
              }}
            >
              <Unlock size={13} /> Reveal
            </button>
          </div>

          {/* Key input */}
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter your key..."
            className="glass-input w-full rounded-2xl px-4 py-3 text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
            autoComplete="off"
          />

          {/* Message textarea — only for Hide mode */}
          {mode === "hide" && (
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's your message?"
              rows={5}
              className="glass-input w-full resize-none rounded-2xl px-4 py-3 text-sm leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          )}

          {/* File upload zone */}
          <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            {!preview ? (
              <label
                htmlFor="file-input"
                className="drop-zone flex items-center gap-3 cursor-pointer rounded-2xl px-4 py-3.5 group"
              >
                <ImagePlus size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
                <span className="text-slate-400 group-hover:text-slate-600 text-sm transition-colors truncate">
                  Attach an image — or drag & drop
                </span>
                <input
                  ref={fileRef}
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="relative rounded-2xl overflow-hidden" style={{ height: 136 }}>
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.32), transparent)" }}
                />
                <div className="absolute bottom-2 left-3 text-white text-xs font-medium truncate max-w-[80%]">
                  {selectedFile?.name}
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 rounded-full p-1.5 text-white hover:opacity-80 transition-opacity"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                  aria-label="Remove file"
                >
                  <X size={13} />
                </button>
              </div>
            )}
          </div>

          {/* Error message */}
          {error && (
            <div
              className="rounded-2xl px-4 py-3 text-sm"
              style={{
                background: "rgba(254, 226, 226, 0.7)",
                border: "1px solid rgba(248, 113, 113, 0.5)",
                color: "#991b1b",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {error}
            </div>
          )}

          {/* Revealed message result */}
          {mode === "reveal" && revealedMessage !== null && (
            <div
              className="glass-input rounded-2xl px-4 py-3 text-sm leading-relaxed break-words"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {revealedMessage}
            </div>
          )}

          {/* Hidden-image result + download */}
          {mode === "hide" && resultImageUrl && (
            <div className="relative rounded-2xl overflow-hidden" style={{ height: 136 }}>
              <img src={resultImageUrl} alt="Encoded result" className="w-full h-full object-cover" />
              <button
                onClick={handleDownload}
                className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white text-xs font-medium hover:opacity-90 transition-opacity"
                style={{ background: "rgba(0,0,0,0.55)" }}
              >
                <Download size={12} /> Download
              </button>
            </div>
          )}

          {/* Upload / Reveal button */}
          <div className="relative mt-1">
            <button
              onClick={handleUpload}
              disabled={!canSubmit}
              className="upload-btn w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 px-6 font-semibold text-sm tracking-wide"
            >
              {done ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {mode === "hide" ? "Uploaded!" : "Revealed!"}
                </>
              ) : uploading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="rgba(30,41,59,0.2)" strokeWidth="2" />
                    <path d="M8 2a6 6 0 0 1 6 6" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {mode === "hide" ? "Uploading..." : "Revealing..."}
                </>
              ) : (
                <>
                  <Upload size={15} />
                  {mode === "hide" ? "Upload" : "Reveal"}
                </>
              )}

              {/* One random image selected on page refresh:
                  Pokémon when USE_POKEMON=true,
                  local sticker when false,
                  local Pikachu fallback when stickers are empty. */}
              {UPLOAD_STICKER_URL && (
                <img
                  src={UPLOAD_STICKER_URL}
                  alt=""
                  className="pikachu-btn"
                  draggable={false}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = pikachuFallback;
                  }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Pokéball / Pokédex corner — only when USE_POKEMON is on.
          Fully client-side: talks to the public PokeAPI directly and
          stores your catches in this browser's localStorage, so it
          never touches the app's backend and never shows up on
          anyone else's copy or device. */}
      {USE_POKEMON && <PokemonCorner />}
    </div>
  );
}
