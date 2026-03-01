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
