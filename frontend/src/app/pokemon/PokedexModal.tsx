import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CircleAlert,
  LoaderCircle,
  Ruler,
  Search,
  Sparkles,
  Trash2,
  Weight,
  X,
} from "lucide-react";
import type { PokemonSummary } from "./types";
import {
  typeColor,
  titleCase,
  formatHeight,
  formatWeight,
  STAT_LABELS,
  STAT_MAX,
} from "./typeColors";
import {
  fetchPokemon,
  PokeApiError,
} from "./pokeapi";
import { getPixelSprite } from "./sprites";
import type { Achievement } from "./PokemonCorner";

type Skin = "retro" | "modern";

const SKIN_STORAGE_KEY = "steg-pokedex:skin";
const SKIN_CHANGE_EVENT = "steg-pokedex:skin-change";

// Modern skin shows the official artwork; Retro skin shows the Gen III
// pixel sprite. Falls back to deriving the pixel sprite from the id for
// any collection entry saved before `pixelSprite` existed on disk.
function displaySprite(
  pokemon: PokemonSummary,
  isRetro: boolean,
): string {
  if (!isRetro) {
    return pokemon.sprite;
  }

  return (
    pokemon.pixelSprite ||
    getPixelSprite(pokemon.id)
  );
}

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
  unreadIds: number[];
  onMarkViewed: (id: number) => void;
  onUpdatePokemon: (pokemon: PokemonSummary) => void;
  unlockedAchievements: string[];
  achievementsList: Achievement[];
}

export default function PokedexModal({
  open,
  onClose,
  collection,
  onRelease,
  initialSelectedId,
  catalog,
  unreadIds,
  onMarkViewed,
  onUpdatePokemon,
  unlockedAchievements,
  achievementsList,
}: PokedexModalProps) {
  const [skin, setSkin] =
    useState<Skin>(() => {
      if (typeof window === "undefined") {
        return "modern";
      }

      return window.localStorage.getItem(
        SKIN_STORAGE_KEY,
      ) === "retro"
        ? "retro"
        : "modern";
    });

  const [selectedId, setSelectedId] =
    useState<number | null>(
      initialSelectedId,
    );
    
  const [tab, setTab] = useState<"pokemon" | "achievements">("pokemon");

  const unreadCount = unreadIds.length;

  useEffect(() => {
    if (open) {
      setSelectedId(initialSelectedId);
    }
  }, [
    open,
    initialSelectedId,
  ]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        SKIN_STORAGE_KEY,
        skin,
      );
    } catch {
      // non-fatal
    }

    window.dispatchEvent(
      new CustomEvent(
        SKIN_CHANGE_EVENT,
        {
          detail: { skin },
        },
      ),
    );
  }, [skin]);

  useEffect(() => {
    if (!open) return;

    const handleKey = (
      event: KeyboardEvent,
    ) => {
      if (event.key !== "Escape") {
        return;
      }

      if (selectedId !== null) {
        setSelectedId(null);
      } else {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKey,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKey,
      );
    };
  }, [
    open,
    onClose,
    selectedId,
  ]);

  const selected = useMemo(
    () =>
      collection.find(
        (pokemon) =>
          pokemon.id === selectedId,
      ) ?? null,
    [
      collection,
      selectedId,
    ],
  );

  const handleSelect = (
    id: number,
  ) => {
    setSelectedId(id);

    // Viewing the actual card/detail clears only
    // that Pokémon's unread notification.
    onMarkViewed(id);
  };

  const handleRelease = (
    id: number,
  ) => {
    onRelease(id);
    setSelectedId(null);
  };

  if (!open) {
    return null;
  }

  const isRetro = skin === "retro";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
      style={{
        background:
          "rgba(15, 23, 42, 0.42)",
        backdropFilter:
          "blur(7px)",
        WebkitBackdropFilter:
          "blur(7px)",
        animation:
          "dexBackdropIn 0.18s ease-out",
        overscrollBehavior: "contain",
      }}
      onClick={onClose}
      role="presentation"
    >
      <style>{`
        @keyframes dexBackdropIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes dexPanelIn {
          from {
            opacity: 0;
            transform:
              translateY(16px)
              scale(0.97);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes dexCardIn {
          from {
            opacity: 0;
            transform:
              translateY(7px)
              scale(0.98);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes dexDotPulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow:
              0 0 0
              rgba(239,68,68,0.15);
          }

          50% {
            transform: scale(1.12);
            box-shadow:
              0 0 9px
              rgba(239,68,68,0.4);
          }
        }

        .dex-skin-btn {
          transition:
            background 0.15s ease,
            color 0.15s ease,
            box-shadow 0.15s ease;
        }

        .dex-thumb {
          position: relative;
          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease,
            border-color 0.15s ease;
          animation:
            dexCardIn 0.22s ease-out both;
        }

        .dex-thumb:hover {
          transform: translateY(-3px);
        }

        .dex-thumb:active {
          transform: translateY(-1px) scale(0.985);
        }

        .dex-unread-dot {
          position: absolute;
          top: 7px;
          right: 7px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ef4444;
          border: 2px solid rgba(255,255,255,0.96);
          z-index: 5;
          pointer-events: none;
          animation:
            dexDotPulse 1.7s ease-in-out infinite;
        }

        .dex-scroll {
          overscroll-behavior: contain;
          scrollbar-width: thin;
          scrollbar-color:
            rgba(148,163,184,0.45)
            transparent;
        }

        .dex-scroll::-webkit-scrollbar {
          width: 7px;
        }

        .dex-scroll::-webkit-scrollbar-thumb {
          background:
            rgba(148,163,184,0.4);
          border-radius: 8px;
        }

        .dex-stat-fill {
          transition:
            width 0.5s
            cubic-bezier(
              0.34,
              1.56,
              0.64,
              1
            );
        }

        .dex-led {
          animation:
            dexBlink
            2.6s
            ease-in-out
            infinite;
        }

        @keyframes dexBlink {
          0%,
          88%,
          100% {
            opacity: 1;
          }

          92% {
            opacity: 0.35;
          }
        }

        @media (max-width: 480px) {
          .dex-mobile-panel {
            max-height:
              min(92dvh, 760px) !important;
            border-radius:
              24px !important;
          }

          .dex-mobile-header {
            padding:
              12px 13px !important;
          }

          .dex-mobile-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr))
            !important;
            gap: 8px !important;
          }

          .dex-mobile-body {
            max-height:
              calc(
                min(92dvh, 760px) -
                60px
              ) !important;
          }

          .dex-mobile-detail {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }

        @media (min-width: 481px) {
          .dex-grid {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>

      <div
        className="dex-mobile-panel w-full max-w-md rounded-[28px] overflow-hidden flex flex-col"
        style={{
          animation:
            "dexPanelIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
          maxHeight:
            "min(720px, 88dvh)",
          ...(isRetro
            ? {
                background:
                  "linear-gradient(155deg, #ef4444 0%, #dc2626 55%, #b91c1c 100%)",
                border:
                  "1px solid rgba(0,0,0,0.15)",
                boxShadow:
                  "0 24px 60px rgba(185,28,28,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
              }
            : {
                background:
                  "rgba(255,255,255,0.65)",
                backdropFilter:
                  "blur(28px)",
                WebkitBackdropFilter:
                  "blur(28px)",
                border:
                  "1px solid rgba(255,255,255,0.85)",
                boxShadow:
                  "0 24px 60px rgba(100,130,200,0.22)",
              }),
        }}
        onClick={(event) =>
          event.stopPropagation()
        }
        role="dialog"
        aria-modal="true"
        aria-label="Pokédex"
      >
        {/* Header */}
        <div
          className="dex-mobile-header flex items-center justify-between gap-2.5 px-5 py-4 shrink-0"
          style={
            isRetro
              ? {
                  background:
                    "rgba(0,0,0,0.12)",
                  borderBottom:
                    "1px solid rgba(0,0,0,0.15)",
                }
              : {
                  borderBottom:
                    "1px solid rgba(30,41,59,0.08)",
                }
          }
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {isRetro && (
              <span
                className="dex-led rounded-full shrink-0"
                style={{
                  width: 12,
                  height: 12,
                  background:
                    "#38bdf8",
                  boxShadow:
                    "0 0 10px 2px rgba(56,189,248,0.85)",
                }}
              />
            )}

            <h2
              className="text-lg font-semibold tracking-tight"
              style={{
                color:
                  isRetro
                    ? "#fff7ed"
                    : "#1e293b",
                fontFamily:
                  "'Outfit', sans-serif",
              }}
            >
              Pokédex
            </h2>

            <span
              className="text-[11px] sm:text-xs font-semibold rounded-full px-2 py-0.5 shrink-0"
              style={{
                background:
                  isRetro
                    ? "rgba(255,255,255,0.18)"
                    : unreadCount > 0
                      ? "rgba(239,68,68,0.11)"
                      : "rgba(30,41,59,0.08)",
                color:
                  isRetro
                    ? "#fff7ed"
                    : unreadCount > 0
                      ? "#dc2626"
                      : "#64748b",
              }}
            >
              {unreadCount}{" "}
              {unreadCount === 1
                ? "new"
                : "new"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Theme switch */}
            <div
              className="flex items-center rounded-full p-0.5 text-[11px] font-medium"
              style={{
                background:
                  isRetro
                    ? "rgba(0,0,0,0.18)"
                    : "rgba(30,41,59,0.06)",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setSkin("retro")
                }
                className="dex-skin-btn rounded-full px-2.5 py-1"
                aria-pressed={
                  isRetro
                }
                style={{
                  background:
                    isRetro
                      ? "rgba(255,255,255,0.22)"
                      : "transparent",
                  color:
                    isRetro
                      ? "#fff7ed"
                      : "#94a3b8",
                }}
              >
                Retro
              </button>

              <button
                type="button"
                onClick={() =>
                  setSkin("modern")
                }
                className="dex-skin-btn rounded-full px-2.5 py-1"
                aria-pressed={
                  !isRetro
                }
                style={{
                  background:
                    !isRetro
                      ? "rgba(255,255,255,0.9)"
                      : "transparent",
                  color:
                    !isRetro
                      ? "#1e293b"
                      : "rgba(255,247,237,0.75)",
                }}
              >
                Modern
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close Pokédex"
              className="rounded-full p-1.5 shrink-0"
              style={{
                color:
                  isRetro
                    ? "#fff7ed"
                    : "#64748b",
                background:
                  isRetro
                    ? "rgba(0,0,0,0.18)"
                    : "rgba(30,41,59,0.06)",
              }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        {selectedId === null && (
          <div
            className="flex gap-2 px-5 py-3 shrink-0"
            style={{
              borderBottom: isRetro
                ? "1px solid rgba(0,0,0,0.15)"
                : "1px solid rgba(30,41,59,0.08)",
              background: isRetro
                ? "rgba(0,0,0,0.08)"
                : "rgba(241,245,249,0.5)",
            }}
          >
            <button
              type="button"
              onClick={() => setTab("pokemon")}
              className="flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-colors"
              style={{
                background: tab === "pokemon"
                  ? isRetro ? "#38bdf8" : "#3b82f6"
                  : "transparent",
                color: tab === "pokemon"
                  ? "#ffffff"
                  : isRetro ? "rgba(255,247,237,0.7)" : "#64748b",
                boxShadow: tab === "pokemon"
                  ? "0 2px 6px rgba(0,0,0,0.15)"
                  : "none",
              }}
            >
              Pokémon ({collection.length})
            </button>

            <button
              type="button"
              onClick={() => setTab("achievements")}
              className="flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-colors"
              style={{
                background: tab === "achievements"
                  ? isRetro ? "#fde047" : "#f59e0b"
                  : "transparent",
                color: tab === "achievements"
                  ? isRetro ? "#78350f" : "#ffffff"
                  : isRetro ? "rgba(255,247,237,0.7)" : "#64748b",
                boxShadow: tab === "achievements"
                  ? "0 2px 6px rgba(0,0,0,0.15)"
                  : "none",
              }}
            >
              Achievements ({unlockedAchievements.length}/{achievementsList.length})
            </button>
          </div>
        )}

        {/* Screen/body */}
        <div
          className="dex-mobile-body dex-scroll overflow-y-auto flex-1"
          style={{
            padding:
              isRetro ? 14 : 0,
          }}
        >
          <div
            className="rounded-2xl"
            style={{
              background:
                isRetro
                  ? "#eaf6e8"
                  : "transparent",
              border:
                isRetro
                  ? "3px solid rgba(0,0,0,0.2)"
                  : "none",
              minHeight:
                isRetro
                  ? 380
                  : undefined,
              padding:
                isRetro
                  ? 14
                  : "18px 20px 22px",
            }}
          >
            {selected ? (
              <DetailView
                pokemon={selected}
                isRetro={isRetro}
                onBack={() =>
                  setSelectedId(
                    null,
                  )
                }
                onRelease={() =>
                  handleRelease(
                    selected.id,
                  )
                }
                onUpdatePokemon={
                  onUpdatePokemon
                }
              />
            ) : tab === "achievements" ? (
              <AchievementsView
                isRetro={isRetro}
                unlockedAchievements={unlockedAchievements}
                achievementsList={achievementsList}
              />
            ) : (
              <GridView
                collection={
                  collection
                }
                catalog={catalog}
                isRetro={isRetro}
                unreadIds={
                  unreadIds
                }
                onSelect={
                  handleSelect
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AchievementsView({
  isRetro,
  unlockedAchievements,
  achievementsList,
}: {
  isRetro: boolean;
  unlockedAchievements: string[];
  achievementsList: Achievement[];
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {achievementsList.map(ach => {
        const isUnlocked = unlockedAchievements.includes(ach.id);
        return (
          <div
            key={ach.id}
            className="flex items-center gap-3 p-3 rounded-2xl transition-all"
            style={{
              background: isUnlocked 
                ? (isRetro ? "rgba(253, 224, 71, 0.2)" : "rgba(245, 158, 11, 0.1)") 
                : (isRetro ? "rgba(0, 0, 0, 0.05)" : "rgba(100, 116, 139, 0.05)"),
              border: `1px solid ${isUnlocked ? (isRetro ? "rgba(253, 224, 71, 0.5)" : "rgba(245, 158, 11, 0.3)") : (isRetro ? "rgba(0,0,0,0.1)" : "rgba(100, 116, 139, 0.1)")}`,
              opacity: isUnlocked ? 1 : 0.65,
            }}
          >
            <span className="text-2xl" style={{ filter: isUnlocked ? "none" : "grayscale(100%) opacity(50%)" }}>
              {isUnlocked ? ach.icon : "🔒"}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold truncate" style={{ color: isUnlocked ? (isRetro ? "#451a03" : "#d97706") : (isRetro ? "#1c1917" : "#475569") }}>
                {ach.title}
              </div>
              <div className="text-[11px] truncate" style={{ color: isRetro ? "rgba(0,0,0,0.6)" : "#64748b" }}>
                {ach.desc}
              </div>
            </div>
            {isUnlocked && (
              <span 
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg"
                style={{
                  color: isRetro ? "#14532d" : "#16a34a",
                  background: isRetro ? "rgba(34, 197, 94, 0.3)" : "#dcfce7"
                }}
              >
                Done
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function GridView({
  collection,
  catalog,
  isRetro,
  unreadIds,
  onSelect,
}: {
  collection: PokemonSummary[];
  catalog?: PokedexCatalogEntry[];
  isRetro: boolean;
  unreadIds: number[];
  onSelect: (id: number) => void;
}) {
  const [query, setQuery] =
    useState("");

  const collectionById = useMemo(() => {
    const map =
      new Map<number, PokemonSummary>();

    for (const pokemon of collection) {
      map.set(
        pokemon.id,
        pokemon,
      );
    }

    return map;
  }, [collection]);

  if (
    catalog &&
    catalog.length > 0
  ) {
    const q =
      query
        .trim()
        .toLowerCase();

    const filteredCatalog =
      !q
        ? catalog
        : catalog.filter(
            (entry) =>
              entry.name
                .toLowerCase()
                .includes(q) ||
              String(entry.id)
                .padStart(3, "0")
                .includes(q) ||
              String(
                entry.id,
              ).includes(q),
          );

    return (
      <div className="flex flex-col gap-3">
        <SearchBox
          isRetro={isRetro}
          query={query}
          onChange={setQuery}
          placeholder="Search the Pokédex..."
        />

        {filteredCatalog.length ===
        0 ? (
          <EmptySearchState />
        ) : (
          <div className="dex-grid grid grid-cols-3 gap-2.5 p-1">
            {filteredCatalog.map(
              (entry) => {
                const caught =
                  collectionById.get(
                    entry.id,
                  );

                return caught ? (
                  <CaughtTile
                    key={entry.id}
                    pokemon={
                      caught
                    }
                    isRetro={
                      isRetro
                    }
                    unread={
                      unreadIds.includes(
                        entry.id,
                      )
                    }
                    onSelect={
                      onSelect
                    }
                  />
                ) : (
                  <SilhouetteTile
                    key={entry.id}
                    id={entry.id}
                    isRetro={
                      isRetro
                    }
                  />
                );
              },
            )}
          </div>
        )}
      </div>
    );
  }

  const filtered =
    useMemo(() => {
      const q =
        query
          .trim()
          .toLowerCase();

      if (!q) {
        return collection;
      }

      return collection.filter(
        (pokemon) =>
          pokemon.name
            .toLowerCase()
            .includes(q) ||
          String(
            pokemon.id,
          )
            .padStart(3, "0")
            .includes(q) ||
          String(
            pokemon.id,
          ).includes(q),
      );
    }, [
      collection,
      query,
    ]);

  if (
    collection.length ===
    0
  ) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-2 py-14 px-4">
        <Sparkles
          size={26}
          style={{
            color:
              isRetro
                ? "#16a34a"
                : "#94a3b8",
          }}
        />

        <p
          className="text-sm font-medium"
          style={{
            color:
              isRetro
                ? "#166534"
                : "#475569",
          }}
        >
          Your Pokédex is empty
        </p>

        <p
          className="text-xs max-w-[220px]"
          style={{
            color:
              isRetro
                ? "#3f6b3f"
                : "#94a3b8",
          }}
        >
          Catch Pokémon with the
          Pokéball, then they'll
          stay here on this device.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <SearchBox
        isRetro={isRetro}
        query={query}
        onChange={setQuery}
        placeholder="Search your Pokédex..."
      />

      {filtered.length ===
      0 ? (
        <EmptySearchState />
      ) : (
        <div className="dex-grid grid grid-cols-3 gap-2.5 p-1">
          {filtered.map(
            (pokemon) => (
              <CaughtTile
                key={
                  pokemon.id
                }
                pokemon={
                  pokemon
                }
                isRetro={
                  isRetro
                }
                unread={
                  unreadIds.includes(
                    pokemon.id,
                  )
                }
                onSelect={
                  onSelect
                }
              />
            ),
          )}
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
      className="glass-input flex items-center gap-2 rounded-xl px-3 py-2.5"
      style={{
        background:
          isRetro
            ? "rgba(255,255,255,0.72)"
            : "rgba(255,255,255,0.5)",
      }}
    >
      <Search
        size={14}
        className="text-slate-400 shrink-0"
      />

      <input
        value={query}
        onChange={(event) =>
          onChange(
            event.target
              .value,
          )
        }
        placeholder={
          placeholder
        }
        className="w-full bg-transparent outline-none text-xs text-slate-700 placeholder:text-slate-400"
        enterKeyHint="search"
        autoComplete="off"
        spellCheck={false}
      />

      {query && (
        <button
          type="button"
          onClick={() =>
            onChange("")
          }
          className="text-[11px] text-slate-400 hover:text-slate-600 shrink-0"
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
      <p className="text-sm font-medium text-slate-600">
        Nothing matches.
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Try a name or Pokédex number.
      </p>
    </div>
  );
}

function CaughtTile({
  pokemon,
  isRetro,
  unread,
  onSelect,
}: {
  pokemon: PokemonSummary;
  isRetro: boolean;
  unread: boolean;
  onSelect: (id: number) => void;
}) {
  const accent =
    typeColor(
      pokemon.types[0] ??
        "normal",
    );

  return (
    <button
      type="button"
      onClick={() =>
        onSelect(pokemon.id)
      }
      className="dex-thumb flex flex-col items-center gap-1 rounded-xl py-2.5 px-1.5"
      style={{
        background:
          isRetro
            ? "rgba(255,255,255,0.7)"
            : "rgba(255,255,255,0.55)",

        border:
          unread
            ? "1.5px solid rgba(239,68,68,0.55)"
            : `1px solid ${accent}33`,

        boxShadow:
          unread
            ? "0 4px 14px rgba(239,68,68,0.16)"
            : `0 2px 10px ${accent}22`,
      }}
      aria-label={
        unread
          ? `${titleCase(pokemon.name)}, newly caught`
          : titleCase(
              pokemon.name,
            )
      }
    >
      {unread && (
        <span
          className="dex-unread-dot"
          aria-hidden="true"
        />
      )}

      <div
        className="rounded-full flex items-center justify-center"
        style={{
          width: 52,
          height: 52,
          background:
            `${accent}1c`,
        }}
      >
        {pokemon.sprite ? (
          <img
            src={displaySprite(
              pokemon,
              isRetro,
            )}
            alt={
              pokemon.name
            }
            className="w-11 h-11 object-contain"
            draggable={false}
            onError={(
              event,
            ) => {
              event.currentTarget.onerror =
                null;

              event.currentTarget.style.display =
                "none";
            }}
          />
        ) : (
          <span className="text-[10px] text-slate-400">
            ?
          </span>
        )}
      </div>

      <span className="text-[10px] font-semibold text-slate-500">
        #
        {String(
          pokemon.id,
        ).padStart(
          3,
          "0",
        )}
      </span>

      <span className="text-xs font-medium text-slate-700 truncate max-w-full">
        {titleCase(
          pokemon.name,
        )}
      </span>

      {pokemon.types.length >
        0 && (
        <div className="flex gap-1 mt-0.5">
          {pokemon.types
            .slice(0, 2)
            .map(
              (type) => (
                <span
                  key={
                    type
                  }
                  className="text-[8px] font-semibold rounded-full px-1.5 py-0.5 text-white"
                  style={{
                    background:
                      typeColor(
                        type,
                      ),
                  }}
                >
                  {titleCase(
                    type,
                  )}
                </span>
              ),
            )}
        </div>
      )}
    </button>
  );
}

function SilhouetteTile({
  id,
  isRetro,
}: {
  id: number;
  isRetro: boolean;
}) {
  return (
    <div
      className="flex flex-col items-center gap-1 rounded-xl py-2.5 px-1.5"
      style={{
        background:
          isRetro
            ? "rgba(0,0,0,0.06)"
            : "rgba(30,41,59,0.04)",
        border:
          "1px solid rgba(148,163,184,0.25)",
      }}
    >
      <div
        className="rounded-full flex items-center justify-center"
        style={{
          width: 52,
          height: 52,
          background:
            "rgba(148,163,184,0.18)",
        }}
      >
        <span className="text-sm font-semibold text-slate-400">
          ?
        </span>
      </div>

      <span className="text-[10px] font-semibold text-slate-400">
        #
        {String(id).padStart(
          3,
          "0",
        )}
      </span>

      <span className="text-xs font-medium text-slate-400">
        ???
      </span>
    </div>
  );
}

function DetailView({
  pokemon,
  isRetro,
  onBack,
  onRelease,
  onUpdatePokemon,
}: {
  pokemon: PokemonSummary;
  isRetro: boolean;
  onBack: () => void;
  onRelease: () => void;
  onUpdatePokemon: (
    pokemon: PokemonSummary,
  ) => void;
}) {
  const [loading, setLoading] =
    useState(false);

  const [detailError, setDetailError] =
    useState<string | null>(
      null,
    );

  useEffect(() => {
    // Old saved catches may have only the basic
    // summary. Fetch richer data the first time
    // the user opens the details.
    if (
      pokemon.types.length > 0 &&
      pokemon.stats.length > 0 &&
      pokemon.abilities.length > 0 &&
      pokemon.height > 0 &&
      pokemon.weight > 0
    ) {
      return;
    }

    let cancelled = false;

    const loadDetails =
      async () => {
        setLoading(true);
        setDetailError(null);

        try {
          const fresh =
            await fetchPokemon(
              String(
                pokemon.id,
              ),
            );

          if (cancelled) {
            return;
          }

          onUpdatePokemon({
            ...fresh,
            caughtAt:
              pokemon.caughtAt,
          });
        } catch (error) {
          if (cancelled) {
            return;
          }

          setDetailError(
            error instanceof PokeApiError
              ? error.message
              : "Couldn't load Pokémon details.",
          );
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

    void loadDetails();

    return () => {
      cancelled = true;
    };
  }, [
    pokemon.id,
    pokemon.types.length,
    pokemon.stats.length,
    pokemon.abilities.length,
    pokemon.height,
    pokemon.weight,
    pokemon.caughtAt,
    onUpdatePokemon,
  ]);

  const currentAccent =
    typeColor(
      pokemon.types[0] ??
        "normal",
    );

  return (
    <div className="dex-mobile-detail flex flex-col gap-4 px-1">
      {/* Detail actions */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5"
          style={{
            color:
              isRetro
                ? "#166534"
                : "#64748b",
            background:
              isRetro
                ? "rgba(0,0,0,0.06)"
                : "rgba(30,41,59,0.06)",
          }}
        >
          <ArrowLeft
            size={12}
          />
          Back
        </button>

        <button
          type="button"
          onClick={onRelease}
          className="flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5"
          style={{
            color:
              "#dc2626",

            background:
              "rgba(220,38,38,0.08)",
          }}
        >
          <Trash2
            size={11}
          />
          Release
        </button>
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center gap-2 pt-1">
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width:
              "clamp(104px, 32vw, 132px)",

            height:
              "clamp(104px, 32vw, 132px)",

            background:
              `radial-gradient(circle, ${currentAccent}33 0%, ${currentAccent}0d 70%, transparent 100%)`,
          }}
        >
          {pokemon.sprite && (
            <img
              src={displaySprite(
                pokemon,
                isRetro,
              )}
              alt={
                pokemon.name
              }
              className="w-[88%] h-[88%] object-contain"
              style={{
                filter:
                  "drop-shadow(0 6px 12px rgba(0,0,0,0.18))",
              }}
              draggable={
                false
              }
              onError={(
                event,
              ) => {
                event.currentTarget.onerror =
                  null;

                event.currentTarget.style.display =
                  "none";
              }}
            />
          )}
        </div>

        <span className="text-xs font-semibold text-slate-400">
          #
          {String(
            pokemon.id,
          ).padStart(
            3,
            "0",
          )}
        </span>

        <h3 className="text-xl font-semibold text-slate-800 tracking-tight">
          {titleCase(
            pokemon.name,
          )}
        </h3>

        {pokemon.types.length >
        0 ? (
          <div className="flex flex-wrap justify-center gap-1.5">
            {pokemon.types.map(
              (type) => (
                <span
                  key={type}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-white"
                  style={{
                    background:
                      typeColor(
                        type,
                      ),
                  }}
                >
                  {titleCase(
                    type,
                  )}
                </span>
              ),
            )}
          </div>
        ) : (
          <span className="text-xs text-slate-400">
            Type information loading...
          </span>
        )}
      </div>

      {/* Loading / API error */}
      {loading && (
        <div
          className="flex items-center justify-center gap-2 text-xs text-slate-400 rounded-xl px-3 py-2"
          style={{
            background:
              "rgba(30,41,59,0.04)",
          }}
        >
          <LoaderCircle
            size={14}
            className="animate-spin"
          />
          Loading Pokémon details...
        </div>
      )}

      {detailError && (
        <div
          className="flex items-start gap-2 text-xs rounded-xl px-3 py-2.5"
          style={{
            background:
              "rgba(254,226,226,0.72)",
            border:
              "1px solid rgba(248,113,113,0.45)",
            color:
              "#991b1b",
          }}
        >
          <CircleAlert
            size={14}
            className="mt-0.5 shrink-0"
          />
          <span>
            {detailError}
          </span>
        </div>
      )}

      {/* Height / weight */}
      {(pokemon.height > 0 ||
        pokemon.weight > 0) && (
        <div className="grid grid-cols-2 gap-2.5">
          {pokemon.height > 0 && (
            <div
              className="rounded-xl px-3 py-2.5"
              style={{
                background:
                  "rgba(30,41,59,0.045)",
              }}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <Ruler
                  size={12}
                />
                Height
              </div>

              <div className="mt-1 text-sm font-semibold text-slate-700">
                {formatHeight(
                  pokemon.height,
                )}
              </div>
            </div>
          )}

          {pokemon.weight > 0 && (
            <div
              className="rounded-xl px-3 py-2.5"
              style={{
                background:
                  "rgba(30,41,59,0.045)",
              }}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <Weight
                  size={12}
                />
                Weight
              </div>

              <div className="mt-1 text-sm font-semibold text-slate-700">
                {formatWeight(
                  pokemon.weight,
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Abilities */}
      {pokemon.abilities.length >
        0 && (
        <div
          className="rounded-xl px-3 py-3"
          style={{
            background:
              "rgba(30,41,59,0.035)",
          }}
        >
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Abilities
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {pokemon.abilities.map(
              (ability) => (
                <span
                  key={ability}
                  className="text-[11px] rounded-full px-2.5 py-1"
                  style={{
                    background:
                      `${currentAccent}14`,
                    color:
                      "#475569",
                    border:
                      `1px solid ${currentAccent}22`,
                  }}
                >
                  {titleCase(
                    ability,
                  )}
                </span>
              ),
            )}
          </div>
        </div>
      )}

      {/* Base stats */}
      {pokemon.stats.length >
        0 && (
        <div
          className="rounded-xl px-3 py-3"
          style={{
            background:
              "rgba(30,41,59,0.035)",
          }}
        >
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
            Base stats
          </div>

          <div className="flex flex-col gap-2">
            {pokemon.stats.map(
              (stat) => (
                <div
                  key={
                    stat.name
                  }
                  className="flex items-center gap-2.5"
                >
                  <span className="text-[10px] font-medium text-slate-500 w-16 shrink-0">
                    {STAT_LABELS[
                      stat.name
                    ] ??
                      titleCase(
                        stat.name,
                      )}
                  </span>

                  <div
                    className="flex-1 h-2 rounded-full overflow-hidden"
                    style={{
                      background:
                        "rgba(30,41,59,0.08)",
                    }}
                  >
                    <div
                      className="dex-stat-fill h-full rounded-full"
                      style={{
                        width:
                          `${Math.min(
                            100,
                            (stat.value /
                              STAT_MAX) *
                              100,
                          )}%`,

                        background:
                          currentAccent,
                      }}
                    />
                  </div>

                  <span className="text-[10px] font-semibold text-slate-500 w-7 text-right">
                    {stat.value}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}