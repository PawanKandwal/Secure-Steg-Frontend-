import type { PokemonSummary } from "./types";

// Public, keyless API. Runs in the visitor's browser; nothing is sent to the
// Secure Steg backend.
const API_BASE = "https://pokeapi.co/api/v2/pokemon";
const MAX_POKEDEX_ID = 1025;
const REQUEST_TIMEOUT_MS = 10_000;
const MAX_RANDOM_ATTEMPTS = 8;

export class PokeApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PokeApiError";
  }
}

interface RawPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      [key: string]: { front_default: string | null } | undefined;
    };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

export interface PokemonNameEntry {
  name: string;
  id: number;
}

let nameIndexPromise: Promise<PokemonNameEntry[]> | null = null;
let nextRequestId = 0;

function toSummary(raw: RawPokemon): PokemonSummary {
  const sprite =
    raw.sprites.other?.["official-artwork"]?.front_default ??
    raw.sprites.front_default ??
    "";

  return {
    id: raw.id,
    name: raw.name,
    sprite,
    types: raw.types.map((t) => t.type.name),
    height: raw.height,
    weight: raw.weight,
    abilities: raw.abilities.map((a) => a.ability.name),
    stats: raw.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    caughtAt: Date.now(),
  };
}

async function fetchJson<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const requestId = ++nextRequestId;
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new PokeApiError(
        res.status === 404
          ? "Pokémon not found."
          : `Pokédex request failed (${res.status}).`,
      );
    }

    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof PokeApiError) throw err;
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new PokeApiError("The Pokédex request timed out. Check your connection.");
    }
    throw new PokeApiError("Couldn't reach the Pokédex. Check your connection.");
  } finally {
    window.clearTimeout(timeout);
    void requestId;
  }
}

/** Fetch one Pokémon by exact name or National Pokédex number. */
export async function fetchPokemon(query: string): Promise<PokemonSummary> {
  const normalized = query.trim().toLowerCase().replace(/\s+/g, "-");
  if (!normalized) {
    throw new PokeApiError("Enter a Pokémon name or Pokédex number.");
  }

  const raw = await fetchJson<RawPokemon>(`${API_BASE}/${encodeURIComponent(normalized)}`);
  return toSummary(raw);
}

/** Fetch a random Pokémon, preferring one that is not in excludeIds. */
export async function fetchRandomPokemon(excludeIds: number[] = []): Promise<PokemonSummary> {
  const excluded = new Set(excludeIds);
  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_RANDOM_ATTEMPTS; attempt++) {
    const id = 1 + Math.floor(Math.random() * MAX_POKEDEX_ID);
    if (excluded.size < MAX_POKEDEX_ID && excluded.has(id)) continue;

    try {
      return await fetchPokemon(String(id));
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new PokeApiError("Couldn't find a Pokémon. Try again.");
}

/** Load names once for fast, client-side search suggestions. */
export async function fetchPokemonIndex(): Promise<PokemonNameEntry[]> {
  if (!nameIndexPromise) {
    nameIndexPromise = fetchJson<{ results: { name: string; url: string }[] }>(
      `${API_BASE}?limit=${MAX_POKEDEX_ID}&offset=0`,
    ).then((payload) =>
      payload.results
        .map((entry) => {
          const match = entry.url.match(/\/pokemon\/(\d+)\/?$/);
          return match ? { name: entry.name, id: Number(match[1]) } : null;
        })
        .filter((entry): entry is PokemonNameEntry => Boolean(entry))
        .sort((a, b) => a.id - b.id),
    );
  }

  try {
    return await nameIndexPromise;
  } catch (err) {
    nameIndexPromise = null;
    throw err;
  }
}
