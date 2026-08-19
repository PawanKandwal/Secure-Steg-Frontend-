// Pure, deterministic sprite-URL builders, shared by every Pokémon
// surface (the floating world, the capture flow, and both Pokédex
// themes) so there is exactly one place that knows these URL shapes.

export function getPixelSprite(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${id}.png`;
}

export function getCuteSprite(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
