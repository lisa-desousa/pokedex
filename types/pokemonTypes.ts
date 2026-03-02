// Den typ vi använder i hela appen
export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  abilities: string[];
  stats: {
    name: string;
    value: number;
  }[];
  description: string;
}

// För sök-funktionen behöver vi bara namn + id (för att visa i dropdown)
export interface PokemonName {
  name: string;
  id: number;
}
