import { useCallback, useEffect, useState } from "react";
import type { PokemonSummary } from "./types";

// Everything lives in this visitor's own browser. Nothing is sent to any
// backend, and nothing here is shared across devices or copies of the app.
const STORAGE_KEY = "steg-pokedex:collection:v1";

function loadCollection(): PokemonSummary[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function usePokedexCollection() {
  const [collection, setCollection] = useState<PokemonSummary[]>(loadCollection);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
    } catch {
      // Storage may be unavailable (private browsing, quota, etc).
      // The Pokédex still works fine for the current session either way.
    }
  }, [collection]);

  const addPokemon = useCallback((pokemon: PokemonSummary) => {
    setCollection((current) => {
      const exists = current.some((p) => p.id === pokemon.id);
      if (exists) {
        return current.map((p) =>
          p.id === pokemon.id ? { ...p, caughtAt: pokemon.caughtAt } : p,
        );
      }
      return [...current, pokemon].sort((a, b) => a.id - b.id);
    });
  }, []);

  const releasePokemon = useCallback((id: number) => {
    setCollection((current) => current.filter((p) => p.id !== id));
  }, []);

  return { collection, addPokemon, releasePokemon };
}
