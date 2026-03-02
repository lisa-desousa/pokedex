import { PokemonApi, PokemonSpeciesApi } from "../types/pokemonApiTypes";
import { Pokemon, PokemonName } from "../types/pokemonTypes";

// Detaljerad data för en specifik pokemon (för details-sidan)
export async function fetchPokemonDetails(name: string): Promise<Pokemon> {
  // 1. Hämta bas-data
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data: PokemonApi = await res.json();

  // 2. Hämta species för beskrivning (flavor-text)
  const speciesRes = await fetch(data.species.url);
  const species: PokemonSpeciesApi = await speciesRes.json();

  const flavor = species.flavor_text_entries.find(
    (entry) => entry.language.name === "en",
  )?.flavor_text;

  // 3. Översätt api-typ till vår interna pokemon-typ
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
    types: data.types.map((t) => t.type.name),
    abilities: data.abilities.map((a) => a.ability.name),
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    description: flavor?.replace(/\n|\f/g, " ") || "No description available",
  };
}

//Hämtar namn + id på alla Pokemons (för sök)
export async function fetchAllPokemonNames(): Promise<PokemonName[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
  const data = await res.json();

  return data.results.map(
    (p: { name: string }, index: number): PokemonName => ({
      name: p.name,
      id: index + 1,
    }),
  );
}

//Hämta första 50 Pokemon med all data (för grid)
export async function fetchPokemons(limit = 50): Promise<Pokemon[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`);
  const data = await res.json();

  const detailedPokemons: Pokemon[] = await Promise.all(
    data.results.map(async (pokemon: { name: string; url: string }) => {
      const res = await fetch(pokemon.url);
      const details: PokemonApi = await res.json();
      // Även här översätta Pokemon-api-typ till intern typ
      return {
        id: details.id,
        name: pokemon.name,
        image: details.sprites.other["official-artwork"].front_default,
        types: details.types.map((t) => t.type.name),
        abilities: details.abilities.map((a) => a.ability.name),
        stats: details.stats.map((s) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
        description: "", // grid behöver inte description, endast details-sidan
      };
    }),
  );

  return detailedPokemons;
}
