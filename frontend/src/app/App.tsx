import { useState, useRef, useEffect } from "react";
import { ImagePlus, X, Upload, Download, Lock, Unlock } from "lucide-react";
import {
  hideMessage,
  revealMessage,
  SecureStegApiError,
} from "../api/secureStegApi";

import pikachuFallback from "../assets/pokemon-pikachu.png";
import PokemonCorner from "./pokemon/PokemonCorner";

// ─────────────────────────────────────────────────────────────────────────
// STICKER / POKÉMON SOURCE SWITCH
//
// true  -> Pokémon mode
//         - random Pokémon on Upload button
//         - floating Pokémon
//         - Pokéball / Pokédex system
//
// false -> Sticker mode
//         - random local sticker on Upload button
//         - floating local stickers
//         - Pokéball / Pokédex hidden
//
// If the local sticker folder is empty while USE_POKEMON is false,
// the Upload button uses the permanent local Pikachu fallback.
// ─────────────────────────────────────────────────────────────────────────

const USE_POKEMON = true;

// true  -> floating stickers can be grabbed and dragged
// false -> floating stickers are not interactive
const INTERACTIVE_STICKERS = true;

// ─────────────────────────────────────────────────────────────────────────
// POKÉMON LIST
// ─────────────────────────────────────────────────────────────────────────

const POKEMON_IDS = [
  25, 1, 7, 6, 39, 94, 133, 143, 54, 4, 152, 155, 158, 175, 183, 196, 197,
  2, 3, 5, 8, 9, 10, 13, 16, 19, 21, 23, 27, 29, 32, 35, 37, 41, 43, 46,
  48, 50, 52, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 83, 84, 86, 88,
  90, 92, 95, 96, 98, 100, 102, 104, 107, 108, 109, 111, 113, 114, 115,
  116, 118, 120, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 134,
  135, 136, 137, 138, 140, 142, 144, 145, 146, 147, 148, 149, 150, 151, 153,
  154, 156, 157, 159, 160, 161, 163, 165, 167, 170, 172, 173, 174, 176, 177,
  179, 181, 182, 184, 185, 186, 187, 190, 191, 193, 194, 198, 199, 200, 201,
  202,
];

// ─────────────────────────────────────────────────────────────────────────
// LOCAL STICKERS
// ─────────────────────────────────────────────────────────────────────────

const stickerModules = import.meta.glob<string>(
  "../assets/stickers/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const STICKER_URLS = Object.values(stickerModules);

// ─────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────

function randomItem<T>(items: T[]): T | null {
  if (items.length === 0) return null;

  return items[Math.floor(Math.random() * items.length)];
}

// ─────────────────────────────────────────────────────────────────────────
// UPLOAD BUTTON IMAGE
// ─────────────────────────────────────────────────────────────────────────
//
// One image is selected when the page loads.
//
// Pokémon mode:
//     one random online Pokémon
//
// Sticker mode:
//     one random local sticker
//
// Empty sticker folder:
//     permanent local Pikachu
// ─────────────────────────────────────────────────────────────────────────

function getUploadSticker(): string {
  if (USE_POKEMON) {
    const randomPokemonId = randomItem(POKEMON_IDS) ?? 25;

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomPokemonId}.png`;
  }

  return randomItem(STICKER_URLS) ?? pikachuFallback;
}

const UPLOAD_STICKER_URL = getUploadSticker();

// ─────────────────────────────────────────────────────────────────────────
// FLOATING BACKGROUND
// ─────────────────────────────────────────────────────────────────────────

const STICKER_SLOT_COUNT = 151;

const STICKER_SLOTS = Array.from(
  { length: STICKER_SLOT_COUNT },
  (_, i) => i,
);

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

// New Pokémon order on every page refresh.
const RANDOM_POKEMON_IDS = shuffled(POKEMON_IDS);

// ─────────────────────────────────────────────────────────────────────────
// FLOATING IMAGE SOURCE
// ─────────────────────────────────────────────────────────────────────────

function getFloatingImageSource(index: number): string | null {
  if (USE_POKEMON) {
    const id =
      RANDOM_POKEMON_IDS[index % RANDOM_POKEMON_IDS.length];

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  if (STICKER_URLS.length > 0) {
    return STICKER_URLS[index % STICKER_URLS.length];
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────
// FLOATING STICKER CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────

function getStickerConfig(index: number) {
  const h = (index * 2654435761) >>> 0;

  const left = (h % 94) + 1;
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

const CONFIGS = STICKER_SLOTS.map((i) =>
  getStickerConfig(i),
);

type Mode = "hide" | "reveal";

// ─────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────

export default function App() {
  const [mode, setMode] = useState<Mode>("hide");

  const [key, setKey] = useState("");

  const [message, setMessage] = useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState<string | null>(null);

  const [uploading, setUploading] = useState(false);

  const [done, setDone] = useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [resultImageUrl, setResultImageUrl] =
    useState<string | null>(null);

  const [revealedMessage, setRevealedMessage] =
    useState<string | null>(null);

  const fileRef =
    useRef<HTMLInputElement>(null);

  // ───────────────────────────────────────────────────────────────────────
  // BACKGROUND STICKER DRAGGING
  // ───────────────────────────────────────────────────────────────────────

  const [draggedSticker, setDraggedSticker] =
    useState<{
      index: number;
      left: number;
      top: number;
    } | null>(null);

  // Exact position where sticker was released.
  const [releasedSticker, setReleasedSticker] =
    useState<{
      index: number;
      left: number;
      top: number;
    } | null>(null);

  const dragRef = useRef<{
    index: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  // ───────────────────────────────────────────────────────────────────────
  // START DRAG
  // ───────────────────────────────────────────────────────────────────────

  const handleStickerPointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (!INTERACTIVE_STICKERS) return;

    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    window.getSelection?.()?.removeAllRanges();

    setReleasedSticker((current) =>
      current?.index === index ? null : current,
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

  // ───────────────────────────────────────────────────────────────────────
  // DRAG MOVEMENT / RELEASE
  // ───────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      if (!dragRef.current) return;

      setDraggedSticker((current) => {
        if (
          !current ||
          current.index !== dragRef.current?.index
        ) {
          return current;
        }

        return {
          ...current,
          left:
            event.clientX -
            dragRef.current.offsetX,
          top:
            event.clientY -
            dragRef.current.offsetY,
        };
      });
    };

    const handlePointerUp = () => {
      if (!dragRef.current) return;

      const released = draggedSticker;

      dragRef.current = null;

      if (released) {
        // Continue floating from exactly where the user released it.
        setReleasedSticker(released);
      }

      setDraggedSticker(null);
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp,
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp,
      );
    };
  }, [draggedSticker]);

  // ───────────────────────────────────────────────────────────────────────
  // CLEANUP RESULT OBJECT URL
  // ───────────────────────────────────────────────────────────────────────

  useEffect(() => {
    return () => {
      if (resultImageUrl) {
        URL.revokeObjectURL(resultImageUrl);
      }
    };
  }, [resultImageUrl]);

  // ───────────────────────────────────────────────────────────────────────
  // RESET
  // ───────────────────────────────────────────────────────────────────────

  const resetResults = () => {
    setError(null);

    setDone(false);

    if (resultImageUrl) {
      URL.revokeObjectURL(resultImageUrl);
    }

    setResultImageUrl(null);

    setRevealedMessage(null);
  };

  // ───────────────────────────────────────────────────────────────────────
  // MODE SWITCH
  // ───────────────────────────────────────────────────────────────────────

  const switchMode = (next: Mode) => {
    if (next === mode || uploading) return;

    setMode(next);

    resetResults();
  };

  // ───────────────────────────────────────────────────────────────────────
  // FILE SELECT
  // ───────────────────────────────────────────────────────────────────────

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    resetResults();

    setSelectedFile(file);

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  // ───────────────────────────────────────────────────────────────────────
  // REMOVE FILE
  // ───────────────────────────────────────────────────────────────────────

  const handleRemoveFile = () => {
    resetResults();

    setSelectedFile(null);

    setPreview(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  // ───────────────────────────────────────────────────────────────────────
  // DROP FILE
  // ───────────────────────────────────────────────────────────────────────

  const handleDrop = (
    e: React.DragEvent,
  ) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];

    if (
      !file ||
      !file.type.startsWith("image/")
    ) {
      return;
    }

    resetResults();

    setSelectedFile(file);

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  // ───────────────────────────────────────────────────────────────────────
  // SUBMIT VALIDATION
  // ───────────────────────────────────────────────────────────────────────

  const canSubmit =
    !uploading &&
    !!selectedFile &&
    !!key &&
    (mode === "reveal" || !!message);

  // ───────────────────────────────────────────────────────────────────────
  // UPLOAD / REVEAL
  // ───────────────────────────────────────────────────────────────────────

  const handleUpload = async () => {
    // Every new request must start with a clean result state.
    // This prevents an old successful revealed message from remaining
    // visible when the next reveal fails (for example with a wrong key).
    setError(null);
    setDone(false);

    if (mode === "reveal") {
      setRevealedMessage(null);
    }

    if (mode === "hide" && resultImageUrl) {
      URL.revokeObjectURL(resultImageUrl);
      setResultImageUrl(null);
    }

    if (!selectedFile) {
      setError("Please attach an image first.");
      return;
    }

    if (!key.trim()) {
      setError("Please enter a key.");
      return;
    }

    if (mode === "hide" && !message.trim()) {
      setError("Please enter a message to hide.");
      return;
    }

    setUploading(true);

    try {
      if (mode === "hide") {
        const blob = await hideMessage(
          selectedFile,
          message,
          key,
        );

        const url = URL.createObjectURL(blob);

        setResultImageUrl(url);
        setDone(true);
      } else {
        const text = await revealMessage(
          selectedFile,
          key,
        );

        // Only show the newly decoded message on success.
        setRevealedMessage(text);
        setError(null);
        setDone(true);
      }
    } catch (err) {
      // Never keep an old successful message after a failed reveal.
      if (mode === "reveal") {
        setRevealedMessage(null);
      }

      setDone(false);

      const msg =
        err instanceof SecureStegApiError
          ? err.message
          : "Something went wrong. Please try again.";

      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  // ───────────────────────────────────────────────────────────────────────
  // DOWNLOAD
  // ───────────────────────────────────────────────────────────────────────

  const handleDownload = () => {
    if (!resultImageUrl) return;

    const a = document.createElement("a");

    a.href = resultImageUrl;

    const baseName =
      selectedFile?.name?.replace(
        /\.[^.]+$/,
        "",
      ) ?? "image";

    a.download = `${baseName}-encoded.png`;

    document.body.appendChild(a);

    a.click();

    a.remove();
  };

  // ───────────────────────────────────────────────────────────────────────
  // RENDER
  // ───────────────────────────────────────────────────────────────────────

  return (
    <div
      className="relative w-full min-h-full overflow-hidden"
      style={{
        minHeight: "100dvh",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <style>{`
        @keyframes floatUp {
          0% {
            transform:
              translateY(110vh)
              translateX(0px)
              rotate(-4deg)
              scale(1);
            opacity: 0;
          }

          5% {
            opacity: 1;
          }

          50% {
            transform:
              translateY(0vh)
              translateX(var(--drift))
              rotate(3deg)
              scale(1.03);
            opacity: 1;
          }

          95% {
            opacity: 1;
          }

          100% {
            transform:
              translateY(-115vh)
              translateX(0px)
              rotate(-2deg)
              scale(0.95);
            opacity: 0;
          }
        }

        @keyframes floatFromGrab {
          0% {
            transform:
              translateY(0px)
              translateX(0px)
              rotate(0deg)
              scale(1.03);
            opacity: 1;
          }

          100% {
            transform:
              translateY(-115vh)
              translateX(var(--drift))
              rotate(3deg)
              scale(1);
            opacity: 0;
          }
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.52);

          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);

          border:
            1px solid
            rgba(255, 255, 255, 0.82);

          box-shadow:
            0 8px 48px rgba(100, 130, 200, 0.14),
            0 2px 12px rgba(100, 130, 200, 0.1),
            inset 0 1.5px 0 rgba(255, 255, 255, 0.95),
            inset 0 -1px 0 rgba(200, 220, 255, 0.15);
        }

        .glass-input {
          background: rgba(255, 255, 255, 0.5);

          border:
            1px solid
            rgba(200, 215, 240, 0.6);

          color: #1e293b;

          transition:
            border-color 0.2s,
            background 0.2s,
            box-shadow 0.2s;
        }

        .glass-input::placeholder {
          color: #94a3b8;
        }

        .glass-input:focus {
          background: rgba(255, 255, 255, 0.72);

          border-color:
            rgba(59, 130, 246, 0.45);

          box-shadow:
            0 0 0 3px
            rgba(59, 130, 246, 0.1);

          outline: none;
        }

        .drop-zone {
          background: rgba(255, 255, 255, 0.38);

          border:
            1.5px dashed
            rgba(148, 163, 184, 0.55);

          transition:
            background 0.2s,
            border-color 0.2s;
        }

        .drop-zone:hover {
          background: rgba(255, 255, 255, 0.6);

          border-color:
            rgba(59, 130, 246, 0.45);
        }

        .upload-btn {
          background:
            linear-gradient(
              135deg,
              #ffcb05 0%,
              #f59e0b 100%
            );

          border:
            1px solid
            rgba(245, 158, 11, 0.5);

          box-shadow:
            0 4px 20px
            rgba(245, 158, 11, 0.3),
            inset 0 1px 0
            rgba(255, 255, 255, 0.4);

          color: #1e293b;

          transition:
            transform 0.15s,
            box-shadow 0.15s;

          position: relative;

          overflow: visible;
        }

        .upload-btn:hover:not(:disabled) {
          box-shadow:
            0 6px 28px
            rgba(245, 158, 11, 0.45),
            inset 0 1px 0
            rgba(255, 255, 255, 0.5);

          transform:
            translateY(-1px);
        }

        .upload-btn:active:not(:disabled) {
          transform:
            translateY(0px)
            scale(0.98);
        }

        .upload-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .pikachu-btn {
          position: absolute;

          bottom: -18px;
          right: -14px;

          width: 62px;
          height: 62px;

          pointer-events: none;

          filter:
            drop-shadow(
              0 3px 6px
              rgba(0, 0, 0, 0.22)
            );

          transition:
            transform 0.2s;
        }

        .upload-btn:hover:not(:disabled)
          .pikachu-btn {
          transform:
            translateY(-3px)
            rotate(5deg);
        }

        .mode-toggle-btn {
          transition:
            background 0.2s,
            color 0.2s,
            box-shadow 0.2s;
        }

        .floating-sticker {
          will-change:
            transform,
            left,
            top;

          user-select: none;

          -webkit-user-select: none;
          -webkit-user-drag: none;
          -webkit-touch-callout: none;
        }

        @media (max-width: 640px) {
          .glass-card {
            box-shadow:
              0 12px 44px
              rgba(100,130,200,0.16),
              0 2px 10px
              rgba(100,130,200,0.10),
              inset 0 1px 1px
              rgba(255,255,255,0.9);
          }

          .pikachu-btn {
            width: 54px;
            height: 54px;
            right: -9px;
            bottom: -13px;
          }

          .floating-sticker {
            max-width: 24vw;
          }
        }
      `}</style>

      {/* Pastel gradient background */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, #dbeafe 0%, #ede9fe 38%, #fce7f3 68%, #e0f2fe 100%)",
        }}
      />

      {/* ────────────────────────────────────────────────────────────────
          FLOATING STICKERS / POKÉMON
      ──────────────────────────────────────────────────────────────── */}

      {!USE_POKEMON && CONFIGS.map((c) =>
        c.src ? (
          <div
            key={`sticker-${c.index}`}
            className="floating-sticker absolute bottom-0 select-none"
            onContextMenu={(event) =>
              event.preventDefault()
            }
            onDragStart={(event) =>
              event.preventDefault()
            }
            aria-hidden={!INTERACTIVE_STICKERS}
            onPointerDown={(event) =>
              handleStickerPointerDown(
                event,
                c.index,
              )
            }
            style={
              draggedSticker?.index ===
              c.index
                ? ({
                    position: "fixed",

                    left:
                      draggedSticker.left,

                    top:
                      draggedSticker.top,

                    bottom: "auto",

                    width: c.size,

                    zIndex: 50,

                    cursor:
                      INTERACTIVE_STICKERS
                        ? "grabbing"
                        : "default",

                    touchAction:
                      INTERACTIVE_STICKERS
                        ? "none"
                        : "auto",

                    userSelect: "none",
                  } as React.CSSProperties)
                : releasedSticker?.index ===
                    c.index
                  ? ({
                      position: "fixed",

                      left:
                        releasedSticker.left,

                      top:
                        releasedSticker.top,

                      bottom: "auto",

                      width: c.size,

                      zIndex: 50,

                      cursor:
                        INTERACTIVE_STICKERS
                          ? "grab"
                          : "default",

                      touchAction:
                        INTERACTIVE_STICKERS
                          ? "none"
                          : "auto",

                      "--drift":
                        `${c.drift}px`,

                      animation:
                        "floatFromGrab 8s linear forwards",
                    } as React.CSSProperties)
                  : ({
                      left: c.left,

                      width: c.size,

                      cursor:
                        INTERACTIVE_STICKERS
                          ? "grab"
                          : "default",

                      touchAction:
                        INTERACTIVE_STICKERS
                          ? "none"
                          : "auto",

                      animation:
                        `floatUp ${c.duration} ${c.delay} infinite ease-in-out`,

                      "--drift":
                        `${c.drift}px`,
                    } as React.CSSProperties)
            }
            onAnimationEnd={() => {
              if (
                releasedSticker?.index ===
                c.index
              ) {
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
                filter:
                  "drop-shadow(0 4px 10px rgba(0,0,0,0.15))",

                pointerEvents: "none",

                userSelect: "none",

                WebkitUserDrag: "none",

                WebkitUserSelect: "none",
              }}
            />
          </div>
        ) : null,
      )}

      {/* ────────────────────────────────────────────────────────────────
          CENTER GLASS CARD
      ──────────────────────────────────────────────────────────────── */}

      <div
        className="absolute inset-0 flex items-center justify-center p-3 sm:p-6 pointer-events-none"
        style={{
          zIndex: 20,
          paddingTop:
            "max(12px, env(safe-area-inset-top))",
          paddingBottom:
            "max(12px, env(safe-area-inset-bottom))",
        }}
      >
        <div
          className="glass-card rounded-[24px] sm:rounded-3xl w-full max-w-md p-5 sm:p-8 flex flex-col gap-4 sm:gap-5 relative overflow-y-auto overflow-x-hidden pointer-events-auto"
          style={{
            zIndex: 20,
            maxHeight:
              "calc(100dvh - max(24px, env(safe-area-inset-top) + env(safe-area-inset-bottom) + 24px))",
            WebkitOverflowScrolling:
              "touch",
          }}
        >

          {/* Pokéball watermark top-right */}

          <div
            className="absolute -top-8 -right-8 pointer-events-none select-none"
            style={{
              opacity: 0.07,
            }}
          >
            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              fill="none"
            >
              <circle
                cx="80"
                cy="80"
                r="78"
                stroke="#1e293b"
                strokeWidth="4"
              />

              <path
                d="M2 80 Q80 80 158 80"
                stroke="#1e293b"
                strokeWidth="4"
              />

              <path
                d="M2 80 A78 78 0 0 1 158 80"
                fill="#ef4444"
              />

              <circle
                cx="80"
                cy="80"
                r="22"
                fill="white"
                stroke="#1e293b"
                strokeWidth="4"
              />

              <circle
                cx="80"
                cy="80"
                r="11"
                fill="white"
                stroke="#1e293b"
                strokeWidth="3"
              />
            </svg>
          </div>

          {/* Decorative Pokéball bottom-left */}

          <div
            className="absolute -bottom-6 -left-6 pointer-events-none select-none"
            style={{
              opacity: 0.05,
            }}
          >
            <svg
              width="100"
              height="100"
              viewBox="0 0 160 160"
              fill="none"
            >
              <circle
                cx="80"
                cy="80"
                r="78"
                stroke="#1e293b"
                strokeWidth="4"
              />

              <path
                d="M2 80 Q80 80 158 80"
                stroke="#1e293b"
                strokeWidth="4"
              />

              <path
                d="M2 80 A78 78 0 0 1 158 80"
                fill="#ef4444"
              />

              <circle
                cx="80"
                cy="80"
                r="22"
                fill="white"
                stroke="#1e293b"
                strokeWidth="4"
              />

              <circle
                cx="80"
                cy="80"
                r="11"
                fill="white"
                stroke="#1e293b"
                strokeWidth="3"
              />
            </svg>
          </div>

          {/* Header */}

          <div className="flex flex-col gap-1">
            <h1 className="text-slate-800 text-[22px] sm:text-2xl font-semibold tracking-tight leading-tight">
              {mode === "hide"
                ? "Write a Message"
                : "Reveal a Message"}
            </h1>

            <p className="text-slate-400 text-sm font-light">
              {mode === "hide"
                ? "Write something and attach an image."
                : "Attach an encoded image and enter its key."}
            </p>
          </div>

          {/* Divider with Pokéball */}

          <div className="flex items-center gap-3 -mt-1">
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "rgba(30,41,59,0.08)",
              }}
            />

            <svg
              width="14"
              height="14"
              viewBox="0 0 160 160"
              fill="none"
              style={{
                opacity: 0.25,
              }}
            >
              <circle
                cx="80"
                cy="80"
                r="78"
                stroke="#1e293b"
                strokeWidth="10"
              />

              <line
                x1="2"
                y1="80"
                x2="158"
                y2="80"
                stroke="#1e293b"
                strokeWidth="10"
              />

              <path
                d="M2 80 A78 78 0 0 1 158 80"
                fill="#ef4444"
              />

              <circle
                cx="80"
                cy="80"
                r="24"
                fill="white"
                stroke="#1e293b"
                strokeWidth="10"
              />

              <circle
                cx="80"
                cy="80"
                r="10"
                fill="#1e293b"
              />
            </svg>

            <div
              className="flex-1 h-px"
              style={{
                background:
                  "rgba(30,41,59,0.08)",
              }}
            />
          </div>

          {/* Hide / Reveal toggle */}

          <div
            className="glass-input flex items-center rounded-2xl p-1 text-sm"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <button
              type="button"
              onClick={() =>
                switchMode("hide")
              }
              className="mode-toggle-btn flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2"
              style={{
                background:
                  mode === "hide"
                    ? "rgba(255,255,255,0.9)"
                    : "transparent",

                color:
                  mode === "hide"
                    ? "#1e293b"
                    : "#94a3b8",

                boxShadow:
                  mode === "hide"
                    ? "0 1px 4px rgba(100,130,200,0.18)"
                    : "none",
              }}
            >
              <Lock size={13} />

              Hide
            </button>

            <button
              type="button"
              onClick={() =>
                switchMode("reveal")
              }
              className="mode-toggle-btn flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2"
              style={{
                background:
                  mode === "reveal"
                    ? "rgba(255,255,255,0.9)"
                    : "transparent",

                color:
                  mode === "reveal"
                    ? "#1e293b"
                    : "#94a3b8",

                boxShadow:
                  mode === "reveal"
                    ? "0 1px 4px rgba(100,130,200,0.18)"
                    : "none",
              }}
            >
              <Unlock size={13} />

              Reveal
            </button>
          </div>

          {/* Key */}

          <input
            type="text"
            value={key}
            onChange={(e) =>
              setKey(e.target.value)
            }
            placeholder="Enter your key..."
            className="glass-input w-full rounded-2xl px-4 py-3 text-sm"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
            autoComplete="off"
          />

          {/* Message */}

          {mode === "hide" && (
            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="What's your message?"
              rows={5}
              className="glass-input w-full resize-none rounded-2xl px-4 py-3 text-sm leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
            />
          )}

          {/* File upload */}

          <div
            onDrop={handleDrop}
            onDragOver={(e) =>
              e.preventDefault()
            }
          >
            {!preview ? (
              <label
                htmlFor="file-input"
                className="drop-zone flex items-center gap-3 cursor-pointer rounded-2xl px-4 py-3.5 group"
              >
                <ImagePlus
                  size={18}
                  className="text-slate-400 group-hover:text-blue-500 transition-colors shrink-0"
                />

                <span className="text-slate-400 group-hover:text-slate-600 text-sm transition-colors truncate">
                  Attach an image — or drag & drop
                </span>

                <input
                  ref={fileRef}
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={
                    handleFileChange
                  }
                />
              </label>
            ) : (
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  height:
                    "clamp(120px, 24vw, 160px)",
                }}
              >
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.32), transparent)",
                  }}
                />

                <div className="absolute bottom-2 left-3 text-white text-xs font-medium truncate max-w-[80%]">
                  {selectedFile?.name}
                </div>

                <button
                  onClick={
                    handleRemoveFile
                  }
                  className="absolute top-2 right-2 rounded-full p-1.5 text-white hover:opacity-80 transition-opacity"
                  style={{
                    background:
                      "rgba(0,0,0,0.45)",
                  }}
                  aria-label="Remove file"
                >
                  <X size={13} />
                </button>
              </div>
            )}
          </div>

          {/* Error */}

          {error && (
            <div
              className="rounded-2xl px-4 py-3 text-sm"
              style={{
                background:
                  "rgba(254, 226, 226, 0.7)",

                border:
                  "1px solid rgba(248, 113, 113, 0.5)",

                color: "#991b1b",

                fontFamily:
                  "'Inter', sans-serif",
              }}
            >
              {error}
            </div>
          )}

          {/* Revealed message */}

          {mode === "reveal" &&
            !error &&
            revealedMessage !== null && (
              <div
                className="glass-input rounded-2xl px-4 py-3 text-sm leading-relaxed break-words"
                style={{
                  fontFamily:
                    "'Inter', sans-serif",
                }}
              >
                {revealedMessage}
              </div>
            )}

          {/* Result image */}

          {mode === "hide" &&
            resultImageUrl && (
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  height:
                    "clamp(120px, 24vw, 160px)",
                }}
              >
                <img
                  src={resultImageUrl}
                  alt="Encoded result"
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={
                    handleDownload
                  }
                  className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white text-xs font-medium hover:opacity-90 transition-opacity"
                  style={{
                    background:
                      "rgba(0,0,0,0.55)",
                  }}
                >
                  <Download size={12} />

                  Download
                </button>
              </div>
            )}

          {/* Upload button */}

          <div className="relative mt-1">
            <button
              onClick={
                handleUpload
              }
              disabled={!canSubmit}
              className="upload-btn w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 px-4 sm:px-6 font-semibold text-sm tracking-wide"
            >
              {done && !error ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8.5l3.5 3.5 6.5-7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {mode === "hide"
                    ? "Uploaded!"
                    : "Revealed!"}
                </>
              ) : uploading ? (
                <>
                  <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="rgba(30,41,59,0.2)"
                      strokeWidth="2"
                    />

                    <path
                      d="M8 2a6 6 0 0 1 6 6"
                      stroke="#1e293b"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>

                  {mode === "hide"
                    ? "Uploading..."
                    : "Revealing..."}
                </>
              ) : (
                <>
                  <Upload size={15} />

                  {mode === "hide"
                    ? "Upload"
                    : "Reveal"}
                </>
              )}

              {/* Upload button Pokémon/sticker */}

              {UPLOAD_STICKER_URL && (
                <img
                  src={UPLOAD_STICKER_URL}
                  alt=""
                  className="pikachu-btn"
                  draggable={false}
                  onError={(event) => {
                    event.currentTarget.onerror =
                      null;

                    event.currentTarget.src =
                      pikachuFallback;
                  }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────
          POKÉBALL / POKÉDEX

          Only rendered when:

              USE_POKEMON === true

          This keeps Pokémon functionality completely disabled when
          USE_POKEMON is false.
      ──────────────────────────────────────────────────────────────── */}

      {USE_POKEMON && <PokemonCorner />}
    </div>
  );
}