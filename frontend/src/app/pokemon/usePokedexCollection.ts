import { useCallback, useEffect, useState } from "react";
import type { PokemonSummary } from "./types";

// Everything lives in this visitor's own browser. Nothing is sent to any
// backend, and nothing here is shared across devices or copies of the app.
const STORAGE_KEY = "steg-pokedex:collection:v1";
const UNREAD_STORAGE_KEY = "steg-pokedex:unread:v1";

function loadCollection(): PokemonSummary[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(
      STORAGE_KEY,
    );

    if (!raw) return [];

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadUnreadIds(): number[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(
      UNREAD_STORAGE_KEY,
    );

    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (id): id is number =>
        typeof id === "number" &&
        Number.isFinite(id),
    );
  } catch {
    return [];
  }
}

export function usePokedexCollection() {
  const [collection, setCollection] =
    useState<PokemonSummary[]>(
      loadCollection,
    );

  const [unreadIds, setUnreadIds] =
    useState<number[]>(
      loadUnreadIds,
    );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(collection),
      );
    } catch {
      // non-fatal
    }
  }, [collection]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        UNREAD_STORAGE_KEY,
        JSON.stringify(unreadIds),
      );
    } catch {
      // non-fatal
    }
  }, [unreadIds]);

  const addPokemon = useCallback(
    (pokemon: PokemonSummary) => {
      setCollection((current) => {
        const exists = current.some(
          (p) => p.id === pokemon.id,
        );

        if (exists) {
          return current.map((p) =>
            p.id === pokemon.id
              ? {
                  ...p,
                  caughtAt: pokemon.caughtAt,
                  // Preserve richer data already stored.
                  types:
                    pokemon.types.length > 0
                      ? pokemon.types
                      : p.types,
                  height:
                    pokemon.height > 0
                      ? pokemon.height
                      : p.height,
                  weight:
                    pokemon.weight > 0
                      ? pokemon.weight
                      : p.weight,
                  abilities:
                    pokemon.abilities.length > 0
                      ? pokemon.abilities
                      : p.abilities,
                  stats:
                    pokemon.stats.length > 0
                      ? pokemon.stats
                      : p.stats,
                  sprite:
                    pokemon.sprite || p.sprite,
                  pixelSprite:
                    pokemon.pixelSprite ||
                    p.pixelSprite,
                }
              : p,
          );
        }

        return [...current, pokemon].sort(
          (a, b) => a.id - b.id,
        );
      });

      // A fresh successful catch is unread even when
      // the species has previously been viewed.
      setUnreadIds((current) =>
        current.includes(pokemon.id)
          ? current
          : [...current, pokemon.id].sort(
              (a, b) => a - b,
            ),
      );
    },
    [],
  );

  const markPokemonViewed =
    useCallback((id: number) => {
      setUnreadIds((current) =>
        current.filter(
          (pokemonId) =>
            pokemonId !== id,
        ),
      );
    }, []);

  const updatePokemon = useCallback(
    (pokemon: PokemonSummary) => {
      setCollection((current) =>
        current
          .map((item) =>
            item.id === pokemon.id
              ? pokemon
              : item,
          )
          .sort(
            (a, b) => a.id - b.id,
          ),
      );
    },
    [],
  );

  const releasePokemon = useCallback(
    (id: number) => {
      setCollection((current) =>
        current.filter(
          (p) => p.id !== id,
        ),
      );

      setUnreadIds((current) =>
        current.filter(
          (pokemonId) =>
            pokemonId !== id,
        ),
      );
    },
    [],
  );

  return {
    collection,
    addPokemon,
    releasePokemon,
    unreadIds,
    markPokemonViewed,
    updatePokemon,
  };
}
