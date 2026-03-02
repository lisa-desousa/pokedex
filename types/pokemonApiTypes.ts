// Det finns två Pokemon-typer, denna som är för det råa API-svaret (PokemonApi) och en annan för den typ som används i appen (Pokemon). Detta gör att man kan ha en tydlig gräns mellan hur datan ser ut i API:t och hur den används i appen, samt att man undviker att använda any i api.tsx

// Huvudtypen för Pokemons från API:t
export interface PokemonApi {
  id: number;
  name: string;
  types: PokemonApiType[];
  abilities: PokemonApiAbility[];
  stats: PokemonApiStat[];
  sprites: PokemonApiSprites;
  species: PokemonApiSpecies;
}

export interface PokemonApiType {
  type: { name: string; url: string };
}

export interface PokemonApiAbility {
  ability: { name: string; url: string };
}

export interface PokemonApiStat {
  base_stat: number;
  stat: { name: string; url: string };
}

export interface PokemonApiSprites {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}

export interface PokemonApiSpecies {
  url: string;
}

// Typen för species API-svaret, som vi använder för att hämta beskrivningen (flavor-text)
export interface PokemonSpeciesApi {
  flavor_text_entries: FlavorTextEntry[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}
