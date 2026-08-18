import { useEffect, useMemo, useState } from "react";
import { X, Ruler, Weight, Sparkles, Trash2, Search } from "lucide-react";
import type { PokemonSummary } from "./types";
import {
  typeColor,
  titleCase,
  formatHeight,
  formatWeight,
  STAT_LABELS,
  STAT_MAX,
} from "./typeColors";

type Skin = "retro" | "modern";
const SKIN_STORAGE_KEY = "steg-pokedex:skin";

/** Minimal species entry used to render the full Pokédex, including
 * Pokémon that haven't been caught yet (shown as silhouettes). Optional —
 * omit it to fall back to showing caught Pokémon only. */
export interface PokedexCatalogEntry {
  id: number;
  name: string;
}

interface PokedexModalProps {
  open: boolean;
  onClose: () => void;
  collection: PokemonSummary[];
  onRelease: (id: number) => void;
  initialSelectedId: number | null;
  catalog?: PokedexCatalogEntry[];
}

export default function PokedexModal({
  open,
  onClose,
  collection,
  onRelease,
  initialSelectedId,
  catalog,
}: PokedexModalProps) {
  const [skin, setSkin] = useState<Skin>(() => {
    if (typeof window === "undefined") return "modern";
    return (window.localStorage.getItem(SKIN_STORAGE_KEY) as Skin) ?? "modern";
  });
  const [selectedId, setSelectedId] = useState<number | null>(initialSelectedId);

  useEffect(() => {
    if (open) setSelectedId(initialSelectedId);
  }, [open, initialSelectedId]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SKIN_STORAGE_KEY, skin);
    } catch {
      // non-fatal
    }
  }, [skin]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedId !== null) setSelectedId(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose, selectedId]);

  const selected = useMemo(
    () => collection.find((p) => p.id === selectedId) ?? null,
    [collection, selectedId],
  );

  if (!open) return null;

  const isRetro = skin === "retro";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        background: "rgba(15, 23, 42, 0.42)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "dexBackdropIn 0.18s ease-out",
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes dexBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes dexPanelIn {
          from { opacity: 0; transform: translateY(14px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .dex-skin-btn { transition: background 0.15s, color 0.15s, box-shadow 0.15s; }
        .dex-thumb { transition: transform 0.15s, box-shadow 0.15s; }
        .dex-thumb:hover { transform: translateY(-3px); }
        .dex-stat-fill { transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .dex-scroll::-webkit-scrollbar { width: 8px; }
        .dex-scroll::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.4); border-radius: 8px; }
        .dex-led { animation: dexBlink 2.6s ease-in-out infinite; }
        @keyframes dexBlink { 0%, 88%, 100% { opacity: 1; } 92% { opacity: 0.35; } }
      `}</style>

      <div
        className="w-full max-w-md rounded-[28px] overflow-hidden"
        style={{
          animation: "dexPanelIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
          maxHeight: "min(640px, 88vh)",
          ...(isRetro
            ? {
                background: "linear-gradient(155deg, #ef4444 0%, #dc2626 55%, #b91c1c 100%)",
                border: "1px solid rgba(0,0,0,0.15)",
                boxShadow: "0 24px 60px rgba(185,28,28,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
              }
            : {
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: "0 24px 60px rgba(100,130,200,0.22)",
              }),
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between gap-3 px-5 py-4"
          style={
            isRetro
              ? { background: "rgba(0,0,0,0.12)", borderBottom: "1px solid rgba(0,0,0,0.15)" }
              : { borderBottom: "1px solid rgba(30,41,59,0.08)" }
          }
        >
          <div className="flex items-center gap-2.5">
            {isRetro && (
              <span
                className="dex-led rounded-full"
                style={{
                  width: 12,
                  height: 12,
                  background: "#38bdf8",
                  boxShadow: "0 0 10px 2px rgba(56,189,248,0.85)",
                }}
              />
            )}
            <h2
              className="text-lg font-semibold tracking-tight"
              style={{ color: isRetro ? "#fff7ed" : "#1e293b", fontFamily: "'Outfit', sans-serif" }}
            >
              Pokédex
            </h2>
            <span
              className="text-xs font-medium rounded-full px-2 py-0.5"
              style={{
                background: isRetro ? "rgba(255,255,255,0.18)" : "rgba(30,41,59,0.08)",
                color: isRetro ? "#fff7ed" : "#64748b",
              }}
            >
              {collection.length}
              {catalog && catalog.length > 0 ? ` / ${catalog.length}` : ""} caught
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Skin toggle */}
            <div
              className="flex items-center rounded-full p-0.5 text-[11px] font-medium"
              style={{ background: isRetro ? "rgba(0,0,0,0.18)" : "rgba(30,41,59,0.06)" }}
            >
              <button
                type="button"
                onClick={() => setSkin("retro")}
                className="dex-skin-btn rounded-full px-2.5 py-1"
                style={{
                  background: isRetro ? "rgba(255,255,255,0.22)" : "transparent",
                  color: isRetro ? "#fff7ed" : "#94a3b8",
                }}
              >
                Retro
              </button>
              <button
                type="button"
                onClick={() => setSkin("modern")}
                className="dex-skin-btn rounded-full px-2.5 py-1"
                style={{
                  background: !isRetro ? "rgba(255,255,255,0.9)" : "transparent",
                  color: !isRetro ? "#1e293b" : "rgba(255,247,237,0.75)",
                }}
              >
                Modern
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close Pokédex"
              className="rounded-full p-1.5"
              style={{
                color: isRetro ? "#fff7ed" : "#64748b",
                background: isRetro ? "rgba(0,0,0,0.18)" : "rgba(30,41,59,0.06)",
              }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Screen / body */}
        <div
          className="dex-scroll overflow-y-auto"
          style={{
            maxHeight: "calc(min(640px, 88vh) - 64px)",
            padding: isRetro ? 14 : 0,
          }}
        >
          <div
            className="rounded-2xl"
            style={{
              background: isRetro ? "#eaf6e8" : "transparent",
              border: isRetro ? "3px solid rgba(0,0,0,0.2)" : "none",
              minHeight: isRetro ? 380 : undefined,
              padding: isRetro ? 14 : "18px 20px 22px",
            }}
          >
            {selected ? (
              <DetailView
                pokemon={selected}
                isRetro={isRetro}
                onBack={() => setSelectedId(null)}
                onRelease={() => {
                  onRelease(selected.id);
                  setSelectedId(null);
                }}
              />
            ) : (
              <GridView
                collection={collection}
                catalog={catalog}
                isRetro={isRetro}
                onSelect={(id) => setSelectedId(id)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GridView({
  collection,
  catalog,
  isRetro,
  onSelect,
}: {
  collection: PokemonSummary[];
  catalog?: PokedexCatalogEntry[];
  isRetro: boolean;
  onSelect: (id: number) => void;
}) {
  const [query, setQuery] = useState("");

  const collectionById = useMemo(() => {
    const map = new Map<number, PokemonSummary>();
    for (const p of collection) map.set(p.id, p);
    return map;
  }, [collection]);

  // Catalog mode: show every known species, caught ones in full, the rest
  // as silhouettes — no network requests for entries that aren't caught.
  if (catalog && catalog.length > 0) {
    const q = query.trim().toLowerCase();
    const filteredCatalog = !q
      ? catalog
      : catalog.filter(
          (entry) =>
            entry.name.toLowerCase().includes(q) ||
            String(entry.id).padStart(3, "0").includes(q) ||
            String(entry.id).includes(q),
        );

    return (
      <div className="flex flex-col gap-3">
        <SearchBox isRetro={isRetro} query={query} onChange={setQuery} placeholder="Search the Pokédex..." />

        {filteredCatalog.length === 0 ? (
          <EmptySearchState />
        ) : (
          <div className="grid grid-cols-3 gap-2.5 p-1">
            {filteredCatalog.map((entry) => {
              const caught = collectionById.get(entry.id);
              return caught ? (
                <CaughtTile key={entry.id} pokemon={caught} isRetro={isRetro} onSelect={onSelect} />
              ) : (
                <SilhouetteTile key={entry.id} id={entry.id} isRetro={isRetro} />
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Fallback: no catalog supplied, just show what's been caught.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return collection;
    return collection.filter(
      (p) =>
        p.name.includes(q) ||
        String(p.id).padStart(3, "0").includes(q) ||
        String(p.id).includes(q),
    );
  }, [collection, query]);

  if (collection.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-2 py-14 px-4">
        <Sparkles size={26} style={{ color: isRetro ? "#16a34a" : "#94a3b8" }} />
        <p className="text-sm font-medium" style={{ color: isRetro ? "#166534" : "#475569" }}>
          Your Pokédex is empty
        </p>
        <p className="text-xs max-w-[220px]" style={{ color: isRetro ? "#3f6b3f" : "#94a3b8" }}>
          Catch Pokémon with the Pokéball, then they'll stay here on this device.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <SearchBox isRetro={isRetro} query={query} onChange={setQuery} placeholder="Search your Pokédex..." />

      {filtered.length === 0 ? (
        <EmptySearchState />
      ) : (
        <div className="grid grid-cols-3 gap-2.5 p-1">
          {filtered.map((p) => (
            <CaughtTile key={p.id} pokemon={p} isRetro={isRetro} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

function SearchBox({
  isRetro,
  query,
  onChange,
  placeholder,
}: {
  isRetro: boolean;
  query: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div
      className="glass-input flex items-center gap-2 rounded-xl px-3 py-2"
      style={{ background: isRetro ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.5)" }}
    >
      <Search size={14} className="text-slate-400 shrink-0" />
      <input
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-xs text-slate-700 placeholder:text-slate-400"
      />
      {query && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="text-[11px] text-slate-400 hover:text-slate-600"
          aria-label="Clear Pokédex search"
        >
          Clear
        </button>
      )}
    </div>
  );
}

function EmptySearchState() {
  return (
    <div className="py-10 text-center">
      <p className="text-sm font-medium text-slate-600">Nothing matches.</p>
      <p className="mt-1 text-xs text-slate-400">Try a name or Pokédex number.</p>
    </div>
  );
}

function CaughtTile({
  pokemon,
  isRetro,
  onSelect,
}: {
  pokemon: PokemonSummary;
  isRetro: boolean;
  onSelect: (id: number) => void;
}) {
  const accent = typeColor(pokemon.types[0]);
  return (
    <button
      type="button"
      onClick={() => onSelect(pokemon.id)}
      className="dex-thumb flex flex-col items-center gap-1 rounded-xl py-2.5 px-1.5"
      style={{
        background: isRetro ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.55)",
        border: `1px solid ${accent}33`,
        boxShadow: `0 2px 10px ${accent}22`,
      }}
    >
      <div className="rounded-full flex items-center justify-center" style={{ width: 52, height: 52, background: `${accent}1c` }}>
        {pokemon.sprite ? (
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="w-11 h-11 object-contain"
            draggable={false}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <span className="text-[10px] text-slate-400">?</span>
        )}
      </div>
      <span className="text-[10px] font-semibold text-slate-500">
        #{String(pokemon.id).padStart(3, "0")}
      </span>
      <span className="text-xs font-medium text-slate-700 truncate max-w-full">
        {titleCase(pokemon.name)}
      </span>
    </button>
  );
}

// Uncaught species: view-only, no sprite request at all (nothing to break,
// nothing to time out on) — just a muted placeholder.
function SilhouetteTile({ id, isRetro }: { id: number; isRetro: boolean }) {
  return (
    <div
      className="flex flex-col items-center gap-1 rounded-xl py-2.5 px-1.5"
      style={{
        background: isRetro ? "rgba(0,0,0,0.06)" : "rgba(30,41,59,0.04)",
        border: "1px solid rgba(148,163,184,0.25)",
      }}
    >
      <div
        className="rounded-full flex items-center justify-center"
        style={{ width: 52, height: 52, background: "rgba(148,163,184,0.18)" }}
      >
        <span className="text-sm font-semibold text-slate-400">?</span>
      </div>
      <span className="text-[10px] font-semibold text-slate-400">
        #{String(id).padStart(3, "0")}
      </span>
      <span className="text-xs font-medium text-slate-400">???</span>
    </div>
  );
}

function DetailView({
  pokemon,
  isRetro,
  onBack,
  onRelease,
}: {
  pokemon: PokemonSummary;
  isRetro: boolean;
  onBack: () => void;
  onRelease: () => void;
}) {
  const accent = typeColor(pokemon.types[0]);

  return (
    <div className="flex flex-col gap-4 px-1">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-medium rounded-full px-2.5 py-1"
          style={{
            color: isRetro ? "#166534" : "#64748b",
            background: isRetro ? "rgba(0,0,0,0.06)" : "rgba(30,41,59,0.06)",
          }}
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onRelease}
          className="flex items-center gap-1 text-xs font-medium rounded-full px-2.5 py-1"
          style={{ color: "#dc2626", background: "rgba(220,38,38,0.08)" }}
        >
          <Trash2 size={11} /> Release
        </button>
      </div>

      <div className="flex flex-col items-center gap-2 pt-1">
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: 132,
            height: 132,
            background: `radial-gradient(circle, ${accent}33 0%, ${accent}0d 70%, transparent 100%)`,
          }}
        >
          {pokemon.sprite && (
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-28 h-28 object-contain"
              style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.18))" }}
              draggable={false}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>
        <span className="text-xs font-semibold text-slate-400">
          #{String(pokemon.id).padStart(3, "0")}
        </span>
        <h3 className="text-xl font-semibold text-slate-800 tracking-tight">
          {titleCase(pokemon.name)}
        </h3>
        <div className="flex gap-1.5">
          {pokemon.types.map((t) => (
            <span
              key={t}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-white"
              style={{ background: typeColor(t) }}
            >
              {titleCase(t)}
            </span>
          ))}
        </div>
      </div>

      {(pokemon.height > 0 || pokemon.weight > 0) && (
        <div className="flex justify-center gap-6 py-1">
          {pokemon.height > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Ruler size={13} /> {formatHeight(pokemon.height)}
            </div>
          )}
          {pokemon.weight > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Weight size={13} /> {formatWeight(pokemon.weight)}
            </div>
          )}
        </div>
      )}

      {pokemon.abilities.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5">
          {pokemon.abilities.map((a) => (
            <span
              key={a}
              className="text-[11px] rounded-full px-2.5 py-1"
              style={{ background: "rgba(30,41,59,0.06)", color: "#475569" }}
            >
              {titleCase(a)}
            </span>
          ))}
        </div>
      )}

      {pokemon.stats.length > 0 && (
      <div className="flex flex-col gap-2 pt-1">
        {pokemon.stats.map((s) => (
          <div key={s.name} className="flex items-center gap-2.5">
            <span className="text-[11px] font-medium text-slate-500 w-16 shrink-0">
              {STAT_LABELS[s.name] ?? titleCase(s.name)}
            </span>
            <div
              className="flex-1 h-2 rounded-full overflow-hidden"
              style={{ background: "rgba(30,41,59,0.08)" }}
            >
              <div
                className="dex-stat-fill h-full rounded-full"
                style={{
                  width: `${Math.min(100, (s.value / STAT_MAX) * 100)}%`,
                  background: accent,
                }}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-500 w-7 text-right">
              {s.value}
            </span>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
