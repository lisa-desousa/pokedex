import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

import type { Pokemon } from "../types/pokemonTypes";

import AutoCompleteDropdown from "../components/AutoCompleteDropdown";
import PokemonGrid from "../components/PokemonGrid";
import SearchBar from "../components/SearchBar";
import { PokemonName } from "../types/pokemonTypes";
import { fetchAllPokemonNames, fetchPokemons } from "../utils/api";

export default function Index() {
  const router = useRouter();

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [allNames, setAllNames] = useState<PokemonName[]>([]);
  const [search, setSearch] = useState("");

  // Hämta alla namn för sök
  useEffect(() => {
    async function getAllNames() {
      const names = await fetchAllPokemonNames();
      setAllNames(names);
    }
    getAllNames();
  }, []);

  // Hämta de första 50 Pokemon för grid
  useEffect(() => {
    async function getPokemons() {
      const data = await fetchPokemons();
      setPokemons(data);
    }
    getPokemons();
  }, []);

  // undvika att search blir undefined
  const normalizedSearch = (search ?? "").toLowerCase();

  const matchingPokemons = allNames.filter((p) => {
    const s = normalizedSearch;
    return p.name.toLowerCase().includes(s) || p.id.toString().includes(s);
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Sökfält */}
      <SearchBar value={search} onChangeText={setSearch} />

      {/* Autocomplete dropdown */}
      <AutoCompleteDropdown
        pokemons={matchingPokemons}
        visible={search.length > 0}
        onSelect={(name) =>
          router.push({ pathname: "/details", params: { name } })
        }
      />

      {/* Grid med Pokemons */}
      <PokemonGrid
        pokemons={pokemons}
        onCardPress={(pokemon) =>
          router.push({ pathname: "/details", params: { name: pokemon.name } })
        }
      />
    </View>
  );
}
