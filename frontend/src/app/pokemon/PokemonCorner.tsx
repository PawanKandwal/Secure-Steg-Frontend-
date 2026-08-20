import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { usePokedexCollection } from "./usePokedexCollection";
import PokedexModal from "./PokedexModal";
import type { PokemonSummary } from "./types";
import { titleCase } from "./typeColors";
import {
  getCuteSprite,
  getPixelSprite,
} from "./sprites";
import type {
  PointerEvent as ReactPointerEvent,
  SyntheticEvent,
} from "react";

// ───────────────────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────────────────

type PokedexTheme = "retro" | "modern";
type Rarity = "common" | "uncommon" | "rare" | "epic";

// ─────────────────────────────────────────────────────────────────────────
// ACHIEVEMENTS DATA
// ─────────────────────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  category: "catches" | "rarity" | "pokedex" | "clicks";
  title: string;
  desc: string;
  icon: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Catches
  { id: "catch_1", category: "catches", title: "First Step", desc: "Catch your very first Pokémon", icon: "🌱" },
  { id: "catch_10", category: "catches", title: "Rising Trainer", desc: "Catch 10 total Pokémon", icon: "⭐" },
  { id: "catch_25", category: "catches", title: "Poké Baller", desc: "Catch 25 total Pokémon", icon: "⚡" },
  { id: "catch_50", category: "catches", title: "Elite Catcher", desc: "Catch 50 total Pokémon", icon: "🔥" },
  { id: "catch_100", category: "catches", title: "Gotta Catch 'Em All", desc: "Catch 100 total Pokémon", icon: "👑" },

  // Rarity
  { id: "rare_uncommon", category: "rarity", title: "Lucky Find", desc: "Catch your first Uncommon Pokémon", icon: "💎" },
  { id: "rare_rare", category: "rarity", title: "Jackpot", desc: "Catch your first Rare Pokémon", icon: "✨" },
  { id: "rare_epic", category: "rarity", title: "Mythical Encounter", desc: "Catch your first Epic Pokémon", icon: "🔮" },
  { id: "rare_legendary", category: "rarity", title: "Living Legend", desc: "Catch your first Legendary Pokémon", icon: "🌌" },

  // Pokédex Unique Species
  { id: "dex_10", category: "pokedex", title: "Field Researcher", desc: "Register 10 unique species in the Pokédex", icon: "📖" },
  { id: "dex_25", category: "pokedex", title: "Pokédex Enthusiast", desc: "Register 25 unique species in the Pokédex", icon: "🔍" },
  { id: "dex_50", category: "pokedex", title: "Regional Master", desc: "Register 50 unique species in the Pokédex", icon: "🏆" },

  // Clicking / Spam
  { id: "click_50", category: "clicks", title: "Fidget Spinner", desc: "Spin the Pokéball 50 times", icon: "🌀" },
  { id: "click_150", category: "clicks", title: "Hyper Drive", desc: "Spin the Pokéball 150 times", icon: "🚀" },
  { id: "ball_morph", category: "clicks", title: "Ball Morph Master", desc: "Trigger a Pokéball shape transition", icon: "✨" },
];

interface PokemonDefinition {
  id: number;
  name: string;
  rarity: Rarity;
  cuteSprite: string;
  pixelSprite: string;
}

interface FloatingPokemon extends PokemonDefinition {
  instanceId: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

interface DragState {
  instanceId: number;
  pointerId: number;
  offsetX: number;
  offsetY: number;
  left: number;
  top: number;
  size: number;
}

interface ReleasedPokemon {
  x: number;
  y: number;
  size: number;
  sprite: string;
  drift: number;
  duration: number;
}

type CaptureState =
  | "idle"
  | "opening"
  | "shaking"
  | "success"
  | "failed";

// ───────────────────────────────────────────────────────────────────────
// Constants
// ───────────────────────────────────────────────────────────────────────

const POKEDEX_THEME_STORAGE_KEY = "steg-pokedex:skin";
const POKEDEX_THEME_EVENT = "steg-pokedex:skin-change";

const WORLD_COUNT = 36;
const WORLD_COUNT_MOBILE = 22;

const Z_FLOAT = 5;
const Z_DRAG = 70;
const Z_CONTROLS = 60;
const Z_CAPTURE = 90;

const RARITY_SETTINGS: Record<
  Rarity,
  {
    weight: number;
    catchChance: number;
  }
> = {
  common: {
    weight: 60,
    catchChance: 0.92,
  },

  uncommon: {
    weight: 27,
    catchChance: 0.76,
  },

  rare: {
    weight: 10,
    catchChance: 0.48,
  },

  epic: {
    weight: 3,
    catchChance: 0.2,
  },
};

// ───────────────────────────────────────────────────────────────────────
// Pokémon names
// ───────────────────────────────────────────────────────────────────────

const POKEMON_NAMES = [
  "Bulbasaur",
  "Ivysaur",
  "Venusaur",
  "Charmander",
  "Charmeleon",
  "Charizard",
  "Squirtle",
  "Wartortle",
  "Blastoise",
  "Caterpie",
  "Metapod",
  "Butterfree",
  "Weedle",
  "Kakuna",
  "Beedrill",
  "Pidgey",
  "Pidgeotto",
  "Pidgeot",
  "Rattata",
  "Raticate",
  "Spearow",
  "Fearow",
  "Ekans",
  "Arbok",
  "Pikachu",
  "Raichu",
  "Sandshrew",
  "Sandslash",
  "Nidoran-f",
  "Nidorina",
  "Nidoqueen",
  "Nidoran-m",
  "Nidorino",
  "Nidoking",
  "Clefairy",
  "Clefable",
  "Vulpix",
  "Ninetales",
  "Jigglypuff",
  "Wigglytuff",
  "Zubat",
  "Golbat",
  "Oddish",
  "Gloom",
  "Vileplume",
  "Paras",
  "Parasect",
  "Venonat",
  "Venomoth",
  "Diglett",
  "Dugtrio",
  "Meowth",
  "Persian",
  "Psyduck",
  "Golduck",
  "Mankey",
  "Primeape",
  "Growlithe",
  "Arcanine",
  "Poliwag",
  "Poliwhirl",
  "Poliwrath",
  "Abra",
  "Kadabra",
  "Alakazam",
  "Machop",
  "Machoke",
  "Machamp",
  "Bellsprout",
  "Weepinbell",
  "Victreebel",
  "Tentacool",
  "Tentacruel",
  "Geodude",
  "Graveler",
  "Golem",
  "Ponyta",
  "Rapidash",
  "Slowpoke",
  "Slowbro",
  "Magnemite",
  "Magneton",
  "Farfetchd",
  "Doduo",
  "Dodrio",
  "Seel",
  "Dewgong",
  "Grimer",
  "Muk",
  "Shellder",
  "Cloyster",
  "Gastly",
  "Haunter",
  "Gengar",
  "Onix",
  "Drowzee",
  "Hypno",
  "Krabby",
  "Kingler",
  "Voltorb",
  "Electrode",
  "Exeggcute",
  "Exeggutor",
  "Cubone",
  "Marowak",
  "Hitmonlee",
  "Hitmonchan",
  "Lickitung",
  "Koffing",
  "Weezing",
  "Rhyhorn",
  "Rhydon",
  "Chansey",
  "Tangela",
  "Kangaskhan",
  "Horsea",
  "Seadra",
  "Goldeen",
  "Seaking",
  "Staryu",
  "Starmie",
  "Mr-mime",
  "Scyther",
  "Jynx",
  "Electabuzz",
  "Magmar",
  "Pinsir",
  "Tauros",
  "Magikarp",
  "Gyarados",
  "Lapras",
  "Ditto",
  "Eevee",
  "Vaporeon",
  "Jolteon",
  "Flareon",
  "Porygon",
  "Omanyte",
  "Omastar",
  "Kabuto",
  "Kabutops",
  "Aerodactyl",
  "Snorlax",
  "Articuno",
  "Zapdos",
  "Moltres",
  "Dratini",
  "Dragonair",
  "Dragonite",
  "Mewtwo",
  "Mew",
];

const EPIC_IDS = new Set([
  144,
  145,
  146,
  150,
  151,
]);

const RARE_IDS = new Set([
  3,
  6,
  9,
  31,
  34,
  38,
  59,
  65,
  68,
  80,
  94,
  115,
  121,
  130,
  131,
  134,
  135,
  136,
  143,
  149,
]);

function getRarity(id: number): Rarity {
  if (EPIC_IDS.has(id)) {
    return "epic";
  }

  if (RARE_IDS.has(id)) {
    return "rare";
  }

  if (id % 3 === 0) {
    return "uncommon";
  }

  return "common";
}

const POKEMON: PokemonDefinition[] =
  POKEMON_NAMES.map((name, index) => {
    const id = index + 1;

    return {
      id,
      name,
      rarity: getRarity(id),
      cuteSprite: getCuteSprite(id),
      pixelSprite: getPixelSprite(id),
    };
  });

const CATALOG = POKEMON.map((pokemon) => ({
  id: pokemon.id,
  name: pokemon.name,
}));

const WEIGHTED_POOL: PokemonDefinition[] =
  POKEMON.flatMap((pokemon) =>
    Array.from(
      {
        length:
          RARITY_SETTINGS[pokemon.rarity].weight,
      },
      () => pokemon,
    ),
  );

// ───────────────────────────────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────────────────────────────

function weightedRandomDefinition(): PokemonDefinition {
  return WEIGHTED_POOL[
    Math.floor(
      Math.random() *
        WEIGHTED_POOL.length,
    )
  ];
}

function createFloatingPokemon(
  instanceId: number,
): FloatingPokemon {
  const definition =
    weightedRandomDefinition();

  return {
    ...definition,

    instanceId,

    left:
      2 + Math.random() * 92,

    size:
      46 + Math.random() * 30,

    duration:
      13 + Math.random() * 9,

    delay:
      Math.random() * 9,

    drift:
      -24 + Math.random() * 48,
  };
}

function buildWorld(): FloatingPokemon[] {
  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth <= 700;

  const count = isMobile
    ? WORLD_COUNT_MOBILE
    : WORLD_COUNT;

  return Array.from(
    { length: count },
    (_, index) =>
      createFloatingPokemon(index),
  );
}

function createSummary(
  pokemon: PokemonDefinition,
): PokemonSummary {
  return {
    id: pokemon.id,
    name: pokemon.name,
    sprite: pokemon.cuteSprite,
    pixelSprite: pokemon.pixelSprite,
    types: [],
    height: 0,
    weight: 0,
    abilities: [],
    stats: [],
    caughtAt: Date.now(),
  };
}

function readPokedexTheme(): PokedexTheme {
  try {
    return window.localStorage.getItem(
      POKEDEX_THEME_STORAGE_KEY,
    ) === "retro"
      ? "retro"
      : "modern";
  } catch {
    return "modern";
  }
}

function wait(ms: number) {
  return new Promise<void>((resolve) =>
    window.setTimeout(resolve, ms),
  );
}

function hideOnError(
  event: SyntheticEvent<HTMLImageElement>,
) {
  event.currentTarget.onerror = null;
  event.currentTarget.style.visibility =
    "hidden";
}

// ───────────────────────────────────────────────────────────────────────
// Main component
// ───────────────────────────────────────────────────────────────────────

export default function PokemonCorner() {
  const {
    collection,
    addPokemon,
    releasePokemon,
    unreadIds,
    markPokemonViewed,
    updatePokemon,
  } = usePokedexCollection();

  const [world, setWorld] =
    useState<FloatingPokemon[]>(
      buildWorld,
    );

  const [drag, setDrag] =
    useState<DragState | null>(null);

  const dragRef =
    useRef<DragState | null>(null);

  const worldRef =
    useRef(world);

  const [released, setReleased] =
    useState<
      Record<number, ReleasedPokemon>
    >({});

  const [pokeballHover, setPokeballHover] =
    useState(false);

  const pokeballRef =
    useRef<HTMLButtonElement | null>(
      null,
    );
  // Tracks the timestamp of the last spin to enforce a speed limit
  const lastSpinTime = useRef(0);

  const [captureState, setCaptureState] =
    useState<CaptureState>("idle");

  const captureStateRef =
    useRef<CaptureState>("idle");

  const [capturePokemon, setCapturePokemon] =
    useState<FloatingPokemon | null>(
      null,
    );

  const [captureStart, setCaptureStart] =
    useState({
      x: 0,
      y: 0,
    });

  const [captureTarget, setCaptureTarget] =
    useState({
      x: 0,
      y: 0,
    });

  const [successName, setSuccessName] =
    useState<string | null>(null);

  const [dexOpen, setDexOpen] =
    useState(false);

  // Ball states
  const [spinDegrees, setSpinDegrees] = useState(0);
  const [ballClicks, setBallClicks] = useState(0);
  const [ballType, setBallType] = useState<"poke" | "great" | "ultra" | "premier" | "master">("poke");

  // Persistent achievements stored in localStorage
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    try {
      return JSON.parse(window.localStorage.getItem("steg-unlocked-achievements") || "[]");
    } catch {
      return [];
    }
  });

  // Toast notification queue state
  const [activeToast, setActiveToast] = useState<Achievement | null>(null);

  // Helper function to check and unlock achievements safely
  const triggerUnlock = useCallback((achievementId: string) => {
    setUnlockedAchievements(prev => {
      if (prev.includes(achievementId)) return prev;
      const next = [...prev, achievementId];
      try {
        window.localStorage.setItem("steg-unlocked-achievements", JSON.stringify(next));
      } catch {}

      const found = ACHIEVEMENTS.find(a => a.id === achievementId);
      if (found) {
        setActiveToast(found);
      }
      return next;
    });
  }, []);

  // Automatically dismiss the toast after 3.5 seconds
  useEffect(() => {
    if (!activeToast) return;
    const timer = window.setTimeout(() => {
      setActiveToast(null);
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [activeToast]);

  const [pokedexTheme, setPokedexTheme] =
    useState<PokedexTheme>(
      readPokedexTheme,
    );

  // Kept in sync via useLayoutEffect (not useEffect) so drag/capture
  // handlers can never read a stale world array.
  useLayoutEffect(() => {
    worldRef.current = world;
  }, [world]);

  useEffect(() => {
    captureStateRef.current =
      captureState;
  }, [captureState]);

  useEffect(() => {
    const handleThemeChange = (
      event: Event,
    ) => {
      const customEvent =
        event as CustomEvent<{
          skin?: string;
          theme?: string;
        }>;

      const next =
        customEvent.detail?.skin ??
        customEvent.detail?.theme;

      if (
        next === "retro" ||
        next === "modern"
      ) {
        setPokedexTheme(next);
      } else {
        setPokedexTheme(
          readPokedexTheme(),
        );
      }
    };

    const handleStorageChange = (
      event: StorageEvent,
    ) => {
      if (
        event.key !==
        POKEDEX_THEME_STORAGE_KEY
      ) {
        return;
      }

      if (
        event.newValue === "retro" ||
        event.newValue === "modern"
      ) {
        setPokedexTheme(
          event.newValue,
        );
      }
    };

    window.addEventListener(
      POKEDEX_THEME_EVENT,
      handleThemeChange,
    );

    window.addEventListener(
      "storage",
      handleStorageChange,
    );

    return () => {
      window.removeEventListener(
        POKEDEX_THEME_EVENT,
        handleThemeChange,
      );

      window.removeEventListener(
        "storage",
        handleStorageChange,
      );
    };
  }, []);

  // ───────────────────────────────────────────────────────────────────
  // Global drag tracking
  // ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      const current =
        dragRef.current;

      if (!current) {
        return;
      }

      const left =
        event.clientX -
        current.offsetX;

      const top =
        event.clientY -
        current.offsetY;

      const next = {
        ...current,
        left,
        top,
      };

      dragRef.current = next;
      setDrag(next);

      const ballRect =
        pokeballRef.current?.getBoundingClientRect();

      if (!ballRect) {
        setPokeballHover(false);
        return;
      }

      const inside = !(
        left + current.size < ballRect.left ||
        left > ballRect.right ||
        top + current.size < ballRect.top ||
        top > ballRect.bottom
      );

      setPokeballHover(inside);
    };

    const finishDrag = () => {
      const current =
        dragRef.current;

      if (!current) {
        return;
      }

      dragRef.current = null;
      setDrag(null);
      setPokeballHover(false);

      const pokemon =
        worldRef.current.find(
          (item) =>
            item.instanceId ===
            current.instanceId,
        );

      if (!pokemon) {
        return;
      }

      const ballRect =
        pokeballRef.current?.getBoundingClientRect();

      const droppedOnBall =
        !!ballRect &&
        !(
          current.left + current.size < ballRect.left ||
          current.left > ballRect.right ||
          current.top + current.size < ballRect.top ||
          current.top > ballRect.bottom
        );

      // ─────────────────────────────────────────────────────────────
      // Catch
      // ─────────────────────────────────────────────────────────────

      if (
        droppedOnBall &&
        ballRect
      ) {
        // One active capture at a time.
        if (
          captureStateRef.current !==
          "idle"
        ) {
          setReleased(
            (previous) => ({
              ...previous,

              [pokemon.instanceId]: {
                x: current.left,
                y: current.top,
                size: pokemon.size,

                sprite:
                  pokemon.cuteSprite,

                drift:
                  pokemon.drift,

                duration:
                  Math.max(
                    6,
                    pokemon.duration *
                      0.65,
                  ),
              },
            }),
          );

          return;
        }

        setCapturePokemon(
          pokemon,
        );

        setCaptureStart({
          x: current.left,
          y: current.top,
        });

        setCaptureTarget({
          x:
            ballRect.left +
            ballRect.width / 2 -
            pokemon.size / 2,

          y:
            ballRect.top +
            ballRect.height / 2 -
            pokemon.size / 2,
        });

        setCaptureState(
          "opening",
        );

        return;
      }

      // ─────────────────────────────────────────────────────────────
      // Normal release
      // ─────────────────────────────────────────────────────────────

      setReleased(
        (previous) => ({
          ...previous,

          [pokemon.instanceId]: {
            x: current.left,
            y: current.top,
            size: pokemon.size,

            sprite:
              pokemon.cuteSprite,

            drift:
              pokemon.drift,

            duration:
              Math.max(
                6,
                pokemon.duration *
                  0.65,
              ),
          },
        }),
      );
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    window.addEventListener(
      "pointerup",
      finishDrag,
    );

    window.addEventListener(
      "pointercancel",
      finishDrag,
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerup",
        finishDrag,
      );

      window.removeEventListener(
        "pointercancel",
        finishDrag,
      );
    };
  }, []);

  // ───────────────────────────────────────────────────────────────────
  // Capture sequence
  // ~0.7 sec enter
  // ~5 sec shake
  // ~1.2 sec result
  // ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!capturePokemon) {
      return;
    }

    let cancelled = false;
    const isStale = () => cancelled;

    const runCapture = async () => {
      setCaptureState("opening");

      await wait(700);

      if (isStale()) {
        return;
      }

      setCaptureState("shaking");

      await wait(5000);

      if (isStale()) {
        return;
      }

      const success =
        Math.random() <
        RARITY_SETTINGS[
          capturePokemon.rarity
        ].catchChance;

      if (success) {
        addPokemon(
          createSummary(
            capturePokemon,
          ),
        );

        setSuccessName(
          capturePokemon.name,
        );

        setCaptureState(
          "success",
        );

        // --- TRIGGER ACHIEVEMENTS ---
        const totalCaught = (collection?.length || 0) + 1;
        const uniqueCaught = new Set([...(collection || []).map(p => p.id), capturePokemon.id]).size;

        if (totalCaught >= 1) triggerUnlock("catch_1");
        if (totalCaught >= 10) triggerUnlock("catch_10");
        if (totalCaught >= 25) triggerUnlock("catch_25");
        if (totalCaught >= 50) triggerUnlock("catch_50");
        if (totalCaught >= 100) triggerUnlock("catch_100");

        if (uniqueCaught >= 10) triggerUnlock("dex_10");
        if (uniqueCaught >= 25) triggerUnlock("dex_25");
        if (uniqueCaught >= 50) triggerUnlock("dex_50");

        if (capturePokemon.rarity === "uncommon") triggerUnlock("rare_uncommon");
        if (capturePokemon.rarity === "rare") triggerUnlock("rare_rare");
        if (capturePokemon.rarity === "epic") triggerUnlock("rare_epic");
        if (capturePokemon.rarity === "legendary") triggerUnlock("rare_legendary");

      } else {
        setSuccessName(null);

        setCaptureState(
          "failed",
        );
      }

      await wait(1200);

      if (isStale()) {
        return;
      }

      const instanceId =
        capturePokemon.instanceId;

      setWorld(
        (current) =>
          current.map(
            (pokemon) =>
              pokemon.instanceId ===
              instanceId
                ? {
                    ...createFloatingPokemon(
                      instanceId,
                    ),
                    delay: 0,
                  }
                : pokemon,
          ),
      );

      setCapturePokemon(null);
      setCaptureState("idle");
      setSuccessName(null);
    };

    void runCapture();

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capturePokemon]); // <--- Only trigger when a new Pokemon is dropped!

  // ───────────────────────────────────────────────────────────────────
  // Start dragging
  // ───────────────────────────────────────────────────────────────────

  const handlePokemonPointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
    pokemon: FloatingPokemon,
  ) => {
    // Other Pokémon remain draggable while a capture runs.
    if (dragRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    window
      .getSelection?.()
      ?.removeAllRanges();

    const rect =
      event.currentTarget.getBoundingClientRect();

    const nextDrag: DragState = {
      instanceId:
        pokemon.instanceId,

      pointerId:
        event.pointerId,

      offsetX:
        event.clientX -
        rect.left,

      offsetY:
        event.clientY -
        rect.top,

      left:
        rect.left,

      top:
        rect.top,

      size:
        pokemon.size,
    };

    dragRef.current =
      nextDrag;

    setDrag(nextDrag);
  };

  const catalog = useMemo(
    () => CATALOG,
    [],
  );

  return (
    <>
      <style>{`
      /* ============================================================
           POKÉBALL SPIN
        ============================================================ */

        @keyframes pcBallSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        /* ============================================================
           NORMAL FLOAT
        ============================================================ */

        @keyframes pcFloatUp {
          0% {
            transform:
              translateY(110vh)
              translateX(0)
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
              translateX(0)
              rotate(-2deg)
              scale(0.95);
            opacity: 0;
          }
        }

        /* ============================================================
           RELEASED FLOAT
        ============================================================ */

        @keyframes pcContinueFloat {
          0% {
            transform:
              translate3d(0, 0, 0)
              rotate(-2deg)
              scale(1);
            opacity: 1;
          }

          20% {
            transform:
              translate3d(
                calc(
                  var(--released-drift) * 0.25
                ),
                -18vh,
                0
              )
              rotate(2deg)
              scale(1.02);
            opacity: 1;
          }

          40% {
            transform:
              translate3d(
                calc(
                  var(--released-drift) * 0.7
                ),
                -38vh,
                0
              )
              rotate(-1deg)
              scale(1);
            opacity: 1;
          }

          60% {
            transform:
              translate3d(
                var(--released-drift),
                -60vh,
                0
              )
              rotate(2deg)
              scale(1.01);
            opacity: 1;
          }

          80% {
            transform:
              translate3d(
                calc(
                  var(--released-drift) * 0.45
                ),
                -88vh,
                0
              )
              rotate(-2deg)
              scale(0.98);
            opacity: 1;
          }

          100% {
            transform:
              translate3d(
                0,
                -125vh,
                0
              )
              rotate(2deg)
              scale(0.94);
            opacity: 1;
          }
        }

        /* ============================================================
           CAPTURE POKÉMON
        ============================================================ */

        @keyframes pcCapturePokemon {
          0% {
            transform:
              translate(0, 0)
              scale(1.05)
              rotate(0deg);
            opacity: 1;
          }

          100% {
            transform:
              translate(
                calc(var(--capture-dx)),
                calc(var(--capture-dy))
              )
              scale(0.18)
              rotate(360deg);
            opacity: 0;
          }
        }

        /* ============================================================
           POKÉBALL SHAKE
        ============================================================ */

        @keyframes pcBallShake {
          0% {
            transform:
              translateX(0)
              rotate(0deg);
          }

          10% {
            transform:
              translateX(-8px)
              rotate(-7deg);
          }

          20% {
            transform:
              translateX(8px)
              rotate(7deg);
          }

          30% {
            transform:
              translateX(-7px)
              rotate(-6deg);
          }

          40% {
            transform:
              translateX(7px)
              rotate(6deg);
          }

          50% {
            transform:
              translateX(-5px)
              rotate(-4deg);
          }

          60% {
            transform:
              translateX(5px)
              rotate(4deg);
          }

          70% {
            transform:
              translateX(-3px)
              rotate(-2deg);
          }

          80% {
            transform:
              translateX(3px)
              rotate(2deg);
          }

          100% {
            transform:
              translateX(0)
              rotate(0deg);
          }
        }

        /* ============================================================
           RED CAPTURE LIGHT
        ============================================================ */

        @keyframes pcBallRedPulse {
          0%,
          100% {
            filter:
              drop-shadow(
                0 0 3px
                rgba(239, 68, 68, 0.25)
              );
          }

          50% {
            filter:
              drop-shadow(
                0 0 18px
                rgba(239, 68, 68, 0.95)
              );
          }
        }

        @keyframes pcBallGreenPulse {
          0%,
          100% {
            filter:
              drop-shadow(
                0 0 4px
                rgba(34, 197, 94, 0.35)
              );
          }

          50% {
            filter:
              drop-shadow(
                0 0 18px
                rgba(34, 197, 94, 0.95)
              );
          }
        }

        /* ============================================================
           RESULT
        ============================================================ */

        @keyframes pcResultIn {
          0% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              translateY(12px)
              scale(0.8);
          }

          100% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              translateY(0)
              scale(1);
          }
        }

        /* ============================================================
           CONTROLS
        ============================================================ */

        .pc-controls {
          position:
            fixed;

          right:
            20px;

          bottom:
            20px;

          z-index:
            ${Z_CONTROLS};

          display:
            flex;

          align-items:
            center;

          gap:
            14px;
        }

        .pc-control {
          border:
            0;

          cursor:
            pointer;
        }

        /* Pokédex - same size as Pokéball */
        .pc-dex-btn {
          position:
            relative;

          flex:
            0 0 64px;

          width:
            64px;

          height:
            64px;

          min-width:
            64px;

          min-height:
            64px;

          aspect-ratio:
            1 / 1;

          border-radius:
            50%;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          color:
            #334155;

          background:
            rgba(
              255,
              255,
              255,
              0.95
            );

          backdrop-filter:
            blur(14px);

          box-shadow:
            0 10px 30px
            rgba(
              100,
              130,
              200,
              0.28
            );

          border:
            0;

          padding:
            0;

          user-select:
            none;

          -webkit-user-select:
            none;

          transition:
            transform
            0.15s
            ease;
        }

        .pc-dex-btn:hover {
          transform:
            translateY(-1px);
        }

        .pc-badge {
          position:
            absolute;

          top:
            -3px;

          right:
            -3px;

          min-width:
            18px;

          height:
            18px;

          padding:
            0 5px;

          border-radius:
            999px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          background:
            #ef4444;

          color:
            white;

          font-size:
            9px;

          font-weight:
            800;
        }

        /* Pokéball - same size */
        .pc-pokeball {
          position:
            relative;

          flex:
            0 0 64px;

          width:
            64px;

          height:
            64px;

          min-width:
            64px;

          min-height:
            64px;

          aspect-ratio:
            1 / 1;

          border-radius:
            50%;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border:
            0;

          padding:
            0;

          background:
            rgba(
              255,
              255,
              255,
              0.95
            );

          box-shadow:
            0 10px 30px
            rgba(
              100,
              130,
              200,
              0.28
            );

          overflow:
            visible;

          user-select:
            none;

          -webkit-user-select:
            none;
        }

        .pc-pokeball:disabled {
          opacity:
            1;
        }

        .pc-ball-glow {
          position:
            absolute;

          inset:
            -8px;

          border-radius:
            50%;

          background:
            radial-gradient(
              circle,
              rgba(
                239,
                68,
                68,
                0.24
              ),
              transparent 70%
            );

          pointer-events:
            none;
        }

        .pc-release-hint {
          position:
            absolute;

          bottom:
            70px;

          right:
            0;

          white-space:
            nowrap;

          padding:
            7px 10px;

          border-radius:
            999px;

          background:
            rgba(
              255,
              255,
              255,
              0.94
            );

          box-shadow:
            0 6px 18px
            rgba(
              100,
              130,
              200,
              0.2
            );

          font-size:
            11px;

          font-weight:
            700;

          color:
            #334155;

          user-select:
            none;

          -webkit-user-select:
            none;
        }

        /* ============================================================
           RESULT
        ============================================================ */

        .pc-capture-result {
          position:
            fixed;

          left:
            50%;

          top:
            50%;

          padding:
            12px 22px;

          border-radius:
            999px;

          background:
            rgba(
              255,
              255,
              255,
              0.97
            );

          box-shadow:
            0 10px 30px
            rgba(
              0,
              0,
              0,
              0.16
            );

          font-size:
            18px;

          font-weight:
            900;

          white-space:
            nowrap;

          animation:
            pcResultIn
            400ms
            ease-out
            forwards;

          user-select:
            none;

          -webkit-user-select:
            none;
        }

        .pc-success-result {
          color:
            #16a34a;
        }

        .pc-failed-result {
          color:
            #ef4444;
        }

        /* ============================================================
           MOBILE
        ============================================================ */

        @media (
          max-width: 640px
        ) {
          .pc-controls {
            right:
              max(12px, env(safe-area-inset-right));

            bottom:
              max(12px, env(safe-area-inset-bottom));

            gap:
              8px;
          }

          .pc-dex-btn {
            flex:
              0 0 54px;

            width:
              54px;

            height:
              54px;

            min-width:
              54px;

            min-height:
              54px;
          }

          .pc-pokeball {
            flex:
              0 0 54px;

            width:
              54px;

            height:
              54px;

            min-width:
              54px;

            min-height:
              54px;
          }
        }
      `}</style>

      {/* ───────────────────────────────────────────────────────────────
          FLOATING WORLD
      ─────────────────────────────────────────────────────────────── */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",

          pointerEvents:
            "none",

          userSelect:
            "none",

          WebkitUserSelect:
            "none",
        }}
        onDoubleClick={(
          event,
        ) => {
          event.preventDefault();
        }}
      >
        {world.map(
          (pokemon) => {
            const isDragging =
              drag?.instanceId ===
              pokemon.instanceId;

            const isReleased =
              !!released[
                pokemon.instanceId
              ];

            const isCapturing =
              capturePokemon?.instanceId ===
                pokemon.instanceId &&
              captureState !==
                "idle";

            if (
              isReleased ||
              isCapturing
            ) {
              return null;
            }

            const sprite =
              pokemon.cuteSprite;

            // Dragging layer
            if (
              isDragging &&
              drag
            ) {
              return (
                <div
                  key={
                    pokemon.instanceId
                  }
                  style={{
                    position:
                      "fixed",

                    left:
                      drag.left,

                    top:
                      drag.top,

                    width:
                      pokemon.size,

                    zIndex:
                      Z_DRAG,

                    pointerEvents:
                      "auto",

                    touchAction:
                      "none",

                    cursor:
                      "grabbing",

                    userSelect:
                      "none",

                    WebkitUserSelect:
                      "none",
                  }}
                  onDoubleClick={(
                    event,
                  ) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                >
                  <img
                    src={sprite}
                    alt=""
                    draggable={
                      false
                    }
                    onError={
                      hideOnError
                    }
                    style={{
                      width:
                        "100%",

                      pointerEvents:
                        "none",

                      userSelect:
                        "none",

                      WebkitUserSelect:
                        "none",

                      transform:
                        pokeballHover
                          ? "scale(1.1)"
                          : "scale(1)",

                      filter:
                        pokeballHover
                          ? "drop-shadow(0 0 16px rgba(239,68,68,0.75))"
                          : "drop-shadow(0 6px 10px rgba(0,0,0,0.25))",

                      transition:
                        "transform 0.15s, filter 0.15s",
                    }}
                  />
                </div>
              );
            }

            // Normal floating layer
            return (
              <div
                key={pokemon.instanceId}
                onPointerDown={(event) =>
                  handlePokemonPointerDown(event, pokemon)
                }
                onContextMenu={(event) => event.preventDefault()}
                onDoubleClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                style={{
                  position: "absolute",
                  zIndex: Z_FLOAT,
                  bottom: 0,

                  left:
                    `${pokemon.left}%`,

                  width:
                    pokemon.size,

                  pointerEvents:
                    "auto",

                  cursor:
                    "grab",

                  touchAction:
                    "none",

                  userSelect:
                    "none",

                  WebkitUserSelect:
                    "none",

                  animation:
                    `pcFloatUp ${pokemon.duration}s ${pokemon.delay}s infinite ease-in-out`,

                  animationFillMode:
                    "both",

                  ["--drift" as string]:
                    `${pokemon.drift}px`,
                }}
              >
                <img
                  src={sprite}
                  alt=""
                  draggable={false}
                  loading="lazy"
                  onError={
                    hideOnError
                  }
                  style={{
                    width:
                      "100%",

                    pointerEvents:
                      "none",

                    userSelect:
                      "none",

                    WebkitUserSelect:
                      "none",

                    filter:
                      "drop-shadow(0 4px 10px rgba(0,0,0,0.18))",
                  }}
                />
              </div>
            );
          },
        )}

        {/* Released Pokémon */}
        {Object.entries(
          released,
        ).map(
          ([
            idString,
            releasedPokemon,
          ]) => {
            const instanceId =
              Number(idString);

            const originalPokemon =
              worldRef.current.find(
                (pokemon) =>
                  pokemon.instanceId ===
                  instanceId,
              );

            if (
              !originalPokemon
            ) {
              return null;
            }

            return (
              <div
                key={
                  `released-${instanceId}`
                }
                onPointerDown={(
                  event,
                ) => {
                  event.preventDefault();
                  event.stopPropagation();

                  setReleased(
                    (current) => {
                      const next = {
                        ...current,
                      };

                      delete next[
                        instanceId
                      ];

                      return next;
                    },
                  );

                  handlePokemonPointerDown(
                    event,
                    originalPokemon,
                  );
                }}
                onContextMenu={(
                  event,
                ) =>
                  event.preventDefault()
                }
                onDoubleClick={(
                  event,
                ) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                style={{
                  position: "fixed",
                  left: releasedPokemon.x,
                  top: releasedPokemon.y,
                  width: releasedPokemon.size,
                  zIndex: Z_FLOAT, // <--- Sinks back behind the Pokéball
                  pointerEvents: "auto",
                  touchAction: "none",
                  cursor: "grab",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  animation: `pcContinueFloat ${releasedPokemon.duration}s linear forwards`,
                  ["--released-drift" as string]: `${releasedPokemon.drift}px`,
                }}
                onAnimationEnd={() => {
                  if (
                    !released[
                      instanceId
                    ]
                  ) {
                    return;
                  }

                  setReleased(
                    (current) => {
                      const next = {
                        ...current,
                      };

                      delete next[
                        instanceId
                      ];

                      return next;
                    },
                  );

                  setWorld(
                    (current) =>
                      current.map(
                        (pokemon) =>
                          pokemon.instanceId ===
                          instanceId
                            ? {
                                ...createFloatingPokemon(
                                  instanceId,
                                ),
                                delay: 0,
                              }
                            : pokemon,
                      ),
                  );
                }}
              >
                <img
                  src={
                    releasedPokemon.sprite
                  }
                  alt=""
                  draggable={false}
                  onError={
                    hideOnError
                  }
                  style={{
                    width:
                      "100%",

                    pointerEvents:
                      "none",

                    userSelect:
                      "none",

                    WebkitUserSelect:
                      "none",

                    filter:
                      "drop-shadow(0 4px 10px rgba(0,0,0,0.18))",
                  }}
                />
              </div>
            );
          },
        )}
      </div>

      {/* ───────────────────────────────────────────────────────────────
          CONTROLS
      ─────────────────────────────────────────────────────────────── */}

      <div className="pc-controls">
        {/* Pokédex */}
        <button
          type="button"
          className="pc-control pc-dex-btn"
          onClick={() =>
            setDexOpen(true)
          }
          onDoubleClick={(
            event,
          ) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          aria-label="Open Pokédex"
        >
          {pokedexTheme === "retro" ? (
            <RetroPokedexIcon />
          ) : (
            <ModernPokedexIcon />
          )}

          {unreadIds.length > 0 && (
            <span
              className="pc-badge"
              aria-label={`${unreadIds.length} unread Pokédex ${
                unreadIds.length === 1
                  ? "entry"
                  : "entries"
              }`}
            >
              {unreadIds.length > 99
                ? "99+"
                : unreadIds.length}
            </span>
          )}
        </button>

        {/* Pokéball */}
        <button
          ref={pokeballRef}
          type="button"
          className="pc-control pc-pokeball"
          aria-label="Pokéball"
          disabled={captureState !== "idle"}
          onClick={() => {
            if (captureState !== "idle") return;

            const now = Date.now();
            if (now - lastSpinTime.current < 120) return;
            
            lastSpinTime.current = now;
            setSpinDegrees(prev => prev + 360);

            // Increment clicks and check for the thresholds
            setBallClicks(prev => {
              const nextClicks = prev + 1;
              
              if (nextClicks >= 50) triggerUnlock("click_50");
              if (nextClicks >= 150) triggerUnlock("click_150");

              if (nextClicks % 50 === 0) {
                triggerUnlock("ball_morph");
                setBallType(currentType => {
                  const allTypes: Array<"poke" | "great" | "ultra" | "premier" | "master"> = 
                    ["poke", "great", "ultra", "premier", "master"];
                  const availableTypes = allTypes.filter(t => t !== currentType);
                  return availableTypes[Math.floor(Math.random() * availableTypes.length)];
                });
              }
              return nextClicks;
            });
          }}
          onDoubleClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          {pokeballHover && captureState === "idle" && (
            <span className="pc-ball-glow" />
          )}

          <div
             style={{
               width: '100%', 
               height: '100%', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center'
             }}
          >
            <PokeballIcon
              open={pokeballHover || captureState === "shaking"}
              capturing={captureState === "shaking"}
              success={captureState === "success"}
              spinDegrees={spinDegrees}
              type={ballType}
            />
          </div>

          {pokeballHover && captureState === "idle" && (
            <span className="pc-release-hint">Release to catch</span>
          )}
        </button>
      </div>

      {/* ───────────────────────────────────────────────────────────────
          CAPTURE OVERLAY
      ─────────────────────────────────────────────────────────────── */}

      {capturePokemon &&
        captureState !==
          "idle" && (
          <div
            style={{
              position:
                "fixed",

              inset:
                0,

              zIndex:
                Z_CAPTURE,

              pointerEvents:
                "none",

              userSelect:
                "none",

              WebkitUserSelect:
                "none",
            }}
          >
            {/* Pokémon flies into the existing Pokéball */}
            {captureState ===
              "opening" && (
              <div
                style={{
                  position:
                    "fixed",

                  left:
                    captureStart.x,

                  top:
                    captureStart.y,

                  width:
                    capturePokemon.size,

                  animation:
                    "pcCapturePokemon 700ms ease-in forwards",

                  ["--capture-dx" as string]:
                    `${
                      captureTarget.x -
                      captureStart.x
                    }px`,

                  ["--capture-dy" as string]:
                    `${
                      captureTarget.y -
                      captureStart.y
                    }px`,
                }}
              >
                <img
                  src={
                    capturePokemon.cuteSprite
                  }
                  alt=""
                  draggable={
                    false
                  }
                  onError={
                    hideOnError
                  }
                  style={{
                    width:
                      "100%",

                    pointerEvents:
                      "none",
                  }}
                />
              </div>
            )}

            {/* Success */}
            {captureState ===
              "success" && (
              <div className="pc-capture-result pc-success-result">
                ✨ GOTCHA!{" "}
                {successName
                  ? titleCase(
                      successName,
                    )
                  : ""}
                ✨
              </div>
            )}

            {/* Failure */}
            {captureState ===
              "failed" && (
              <div className="pc-capture-result pc-failed-result">
                💨 IT RAN AWAY!
              </div>
            )}
          </div>
        )}

      {/* ───────────────────────────────────────────────────────────────
          POKÉDEX MODAL
      ─────────────────────────────────────────────────────────────── */}

      <PokedexModal
        open={dexOpen}
        onClose={() =>
          setDexOpen(false)
        }
        collection={
          collection
        }
        onRelease={
          releasePokemon
        }
        initialSelectedId={
          null
        }
        catalog={
          catalog
        }
        unreadIds={
          unreadIds
        }
        onMarkViewed={
          markPokemonViewed
        }
        onUpdatePokemon={
          updatePokemon
        }
        unlockedAchievements={unlockedAchievements}
        achievementsList={ACHIEVEMENTS}
      />

      {/* ───────────────────────────────────────────────────────────────
          ACHIEVEMENT UNLOCK TOAST NOTIFICATION
      ─────────────────────────────────────────────────────────────── */}

      {activeToast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(15, 23, 42, 0.92)",
            color: "#f8fafc",
            padding: "12px 20px",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.15)",
            zIndex: 9999,
            animation: "pcResultIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}
        >
          <span style={{ fontSize: "20px" }}>{activeToast.icon}</span>
          <div>
            <div style={{ fontSize: "10px", textTransform: "uppercase", color: "#fbbf24", fontWeight: 700, letterSpacing: "0.05em" }}>
              Achievement Unlocked!
            </div>
            <div style={{ fontSize: "13px", fontWeight: 600 }}>{activeToast.title}</div>
          </div>
        </div>
      )}

    </>
  );
}

// ───────────────────────────────────────────────────────────────────────
// Theme-matched Pokédex icons
// ───────────────────────────────────────────────────────────────────────

function RetroPokedexIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      style={{
        display: "block",
        flex: "0 0 auto",
      }}
    >
      {/* Classic red Pokédex body */}
      <path
        d="
          M8 14
          C8 10.686 10.686 8 14 8
          H50
          C53.314 8 56 10.686 56 14
          V50
          C56 53.314 53.314 56 50 56
          H14
          C10.686 56 8 53.314 8 50
          Z
        "
        fill="#DC2626"
        stroke="#7F1D1D"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Top blue lens */}
      <circle
        cx="22"
        cy="20"
        r="7"
        fill="#38BDF8"
        stroke="#F0F9FF"
        strokeWidth="2"
      />

      {/* Small status lights */}
      <circle
        cx="38"
        cy="14"
        r="1.8"
        fill="#FDE68A"
      />
      <circle
        cx="45"
        cy="14"
        r="1.8"
        fill="#FDE68A"
      />
      <circle
        cx="51"
        cy="14"
        r="1.8"
        fill="#FDE68A"
      />

      {/* Classic angled screen panel */}
      <path
        d="
          M10 31
          H38
          L48 22
          H54
          V30
          H49
          L39 39
          H10
          Z
        "
        fill="#B91C1C"
        stroke="#7F1D1D"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Small yellow indicator */}
      <path
        d="M12 43L16 45L12 47Z"
        fill="#FDE68A"
      />

      {/* Lower slot */}
      <rect
        x="23"
        y="48"
        width="18"
        height="3"
        rx="1.5"
        fill="#991B1B"
      />
    </svg>
  );
}

function ModernPokedexIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      style={{
        display: "block",
        flex: "0 0 auto",
      }}
    >
      {/* Light-blue handheld Pokédex body */}
      <path
        d="
          M23 7
          C16 8 11 14 11 21
          V48
          L30 57
          L49 46
          V23
          C49 20 48 18 46 16
          L38 9
          C34 6 28 6 23 7
          Z
        "
        fill="#CFEFF7"
        stroke="#374151"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />

      {/* Antenna */}
      <path
        d="M30 7V14"
        stroke="#374151"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Pokéball-like screen */}
      <circle
        cx="30"
        cy="25"
        r="11"
        fill="#DDF6FC"
        stroke="#374151"
        strokeWidth="3"
      />

      {/* Blue upper screen */}
      <path
        d="
          M21 25
          A9 9 0 0 1 39 25
          Z
        "
        fill="#1D9FE2"
      />

      {/* Screen divider */}
      <line
        x1="19"
        y1="25"
        x2="41"
        y2="25"
        stroke="#374151"
        strokeWidth="3"
      />

      {/* Center button */}
      <circle
        cx="30"
        cy="25"
        r="4"
        fill="white"
        stroke="#374151"
        strokeWidth="2.4"
      />

      {/* Small lower button */}
      <circle
        cx="20"
        cy="41"
        r="3"
        fill="#374151"
      />

      {/* Speaker lines */}
      <path
        d="M18 48H28"
        stroke="#374151"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M18 53H25"
        stroke="#374151"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ───────────────────────────────────────────────────────────────────────
// Perfect circular Pokéball
// ───────────────────────────────────────────────────────────────────────

function PokeballIcon({
  open,
  capturing,
  success,
  spinDegrees = 0,
  type = "poke",
}: {
  open?: boolean;
  capturing?: boolean;
  success?: boolean;
  spinDegrees?: number;
  type?: "poke" | "great" | "ultra" | "premier" | "master";
}) {
  const theme = {
    poke: { top: "#EF4444", bottom: "white", ring: "#1E293B" },
    great: { top: "#3B82F6", bottom: "white", ring: "#1E293B" },
    ultra: { top: "#334155", bottom: "white", ring: "#1E293B" },
    premier: { top: "white", bottom: "white", ring: "#EF4444" },
    master: { top: "#8B5CF6", bottom: "white", ring: "#1E293B" },
  }[type] || { top: "#EF4444", bottom: "white", ring: "#1E293B" };

  const morphTransition = "fill 0.4s ease, stroke 0.4s ease, opacity 0.4s ease";

  return (
    <svg
      width="70%"
      height="70%"
      viewBox="0 0 160 160"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      style={{
        width: "70%",
        height: "70%",
        aspectRatio: "1 / 1",
        display: "block",
        flex: "0 0 auto",
        userSelect: "none",
        WebkitUserSelect: "none",
        transform: `rotate(${spinDegrees}deg)`,
        transition: capturing || success ? "none" : "transform 2s cubic-bezier(0.1, 0.9, 0.2, 1)",
        animation: capturing
          ? "pcBallShake 0.8s ease-in-out infinite, pcBallRedPulse 0.65s ease-in-out infinite"
          : success
            ? "pcBallGreenPulse 0.75s ease-in-out infinite"
            : undefined,
      }}
    >
      <defs>
        <clipPath id="pokeball-circle-clip">
          <circle cx="80" cy="80" r="72" />
        </clipPath>
      </defs>

      <circle cx="80" cy="80" r="72" fill={theme.bottom} style={{ transition: morphTransition }} />
      <rect x="8" y="8" width="144" height="72" fill={theme.top} clipPath="url(#pokeball-circle-clip)" style={{ transition: morphTransition }} />

      <path d="M 25 15 Q 50 35 45 60 L 25 60 Q 25 35 10 25 Z" fill="#EF4444" clipPath="url(#pokeball-circle-clip)" style={{ opacity: type === "great" ? 1 : 0, transition: morphTransition }} />
      <path d="M 135 15 Q 110 35 115 60 L 135 60 Q 135 35 150 25 Z" fill="#EF4444" clipPath="url(#pokeball-circle-clip)" style={{ opacity: type === "great" ? 1 : 0, transition: morphTransition }} />
      <path d="M 40 80 L 40 40 L 120 40 L 120 80 L 140 80 L 140 20 L 20 20 L 20 80 Z" fill="#FACC15" clipPath="url(#pokeball-circle-clip)" style={{ opacity: type === "ultra" ? 1 : 0, transition: morphTransition }} />
      <circle cx="35" cy="40" r="16" fill="#EC4899" clipPath="url(#pokeball-circle-clip)" style={{ opacity: type === "master" ? 1 : 0, transition: morphTransition }} />
      <circle cx="125" cy="40" r="16" fill="#EC4899" clipPath="url(#pokeball-circle-clip)" style={{ opacity: type === "master" ? 1 : 0, transition: morphTransition }} />
      <path d="M 62 30 L 72 30 L 80 44 L 88 30 L 98 30 L 98 55 L 88 55 L 88 40 L 80 50 L 72 40 L 72 55 L 62 55 Z" fill="white" style={{ opacity: type === "master" ? 1 : 0, transition: morphTransition }} />

      <circle cx="80" cy="80" r="72" stroke="#1E293B" strokeWidth="8" />
      <line x1="8" y1="80" x2="152" y2="80" stroke={theme.ring} strokeWidth="8" style={{ transition: morphTransition }} />
      <circle cx="80" cy="80" r="22" fill="white" stroke={theme.ring} strokeWidth="8" style={{ transition: morphTransition }} />
      <circle cx="80" cy="80" r="9" fill={success ? "#22C55E" : open ? "#EF4444" : theme.ring} style={{ transition: morphTransition }} />
    </svg>
  );
}