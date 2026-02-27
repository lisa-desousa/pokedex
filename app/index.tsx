import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import getPokemonTypeColor from "./colorsByType";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export default function Index() {
  const router = useRouter();

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [allNames, setAllNames] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  // hämta endast namn för sökfunktion
  useEffect(() => {
    async function fetchAllNames() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
      const data = await res.json();
      setAllNames(data.results.map((p: any) => p.name));
    }
    fetchAllNames();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=50",
      );
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            id: details.id,
            name: pokemon.name,
            image: details.sprites.other["official-artwork"].front_default,
            types: details.types,
          };
        }),
      );

      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }

  const matchingNames = allNames.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={{ flex: 1 }}>
      {/* sökfält */}
      <TextInput
        placeholder="Search Pokémon..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* autocomplete dropdown */}
      {search.length > 0 && (
        <View style={styles.dropdown}>
          {matchingNames.slice(0, 15).map((name) => (
            <Pressable
              key={name}
              onPress={() =>
                router.push({ pathname: "/details", params: { name } })
              }
            >
              <Text style={styles.resultItem}>{name}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* flöde med 50 första pokemons */}
      <ScrollView
        contentContainerStyle={{
          gap: 12,
          padding: 16,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {pokemons.map((pokemon) => (
          <Link
            key={pokemon.name}
            href={{ pathname: "/details", params: { name: pokemon.name } }}
            asChild
            // asChild gör att Links barn blir klickbar, men det måste vara en Pressable eller TouchableOpacity för att fungera på mobil!
            // Det blev konstigt med styling när jag skule stylea Link
          >
            <Pressable
              style={{
                backgroundColor:
                  getPokemonTypeColor(pokemon.types[0].type.name) + "50",
                padding: 20,
                borderRadius: 20,
                width: "48%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: pokemon.image }}
                style={{ width: 100, height: 100 }}
              ></Image>
              <Text style={styles.name}>{pokemon.name}</Text>
              <Text>#{pokemon.id}</Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
    color: "#333",
  },

  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
    textTransform: "capitalize",
  },

  search: {
    margin: 16,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },

  dropdown: {
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
  },

  resultItem: {
    paddingVertical: 8,
    fontSize: 16,
    textTransform: "capitalize",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
