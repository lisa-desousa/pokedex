import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getPokemonTypeColor } from "./colorsByType";

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
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    //fetch pokemons
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=10",
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

  return (
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
          asChild //View blir klickbar istället, stylingen på Link funkade inte som jag ville
        >
          <View
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
            <Text>00{pokemon.id}</Text>{" "}
            {/* Här kan man göra en funkton som lägger till 0:or framför endast när det behövs... tex pokemon med id 189 behöver ju inte ha 00 innan */}
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },

  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
    textTransform: "capitalize",
  },
});
