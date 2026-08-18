export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonSummary {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  /** decimetres, as returned by PokeAPI */
  height: number;
  /** hectograms, as returned by PokeAPI */
  weight: number;
  abilities: string[];
  stats: PokemonStat[];
  caughtAt: number;
}
