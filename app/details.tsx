// import { Stack, useLocalSearchParams } from "expo-router";
// import { useEffect } from "react";
// import { ScrollView, StyleSheet, Text } from "react-native";

// export default function Details() {
//   const params = useLocalSearchParams();

//   useEffect(() => {
//     fetchPokemonByName(params.name as string);
//   }, [params.name]);

//   async function fetchPokemonByName(name: string) {
//     try {
//       const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
//       const data = await response.json();

//       return {
//         name: data.name,
//         image: data.sprites.front_default,
//         imageBack: data.sprites.back_default,
//         types: data.types,
//       };
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   return (
//     <>
//       <Stack.Screen options={{ title: params.name as string }} />
//       <ScrollView
//         contentContainerStyle={{
//           gap: 16,
//           padding: 16,
//         }}
//       >
//         <Text style={styles.name}>{params.name}</Text>
//       </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   name: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//   },

//   type: {},
// });

import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  abilities: string[];
  stats: PokemonStats[];
  description: string;
}

interface PokemonStats {
  name: string;
  value: number;
}

export default function Details() {
  const params = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetchPokemonDetails(params.name as string).then(setPokemon);
  }, [params.name]);

  // --------------------
  // Fetch function
  // --------------------
  async function fetchPokemonDetails(name: string): Promise<Pokemon> {
    // 1. Pokémon data
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();

    // 2. Species data (beskrivningen)
    const speciesRes = await fetch(data.species.url);
    const species = await speciesRes.json();

    const flavor = species.flavor_text_entries.find(
      (entry: any) => entry.language.name === "en",
    )?.flavor_text;

    // Vi returnerar direkt enligt vårt interface
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other["showdown"].front_default,
      types: data.types.map((t: any) => t.type.name),
      abilities: data.abilities.map((a: any) => a.ability.name),
      stats: data.stats.map((s: any) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
      description: flavor?.replace(/\n|\f/g, " ") || "No description available",
    };
  }

  if (!pokemon) return null;

  return (
    <>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.name}>{pokemon.name}</Text>

        {pokemon.image && (
          <Image source={{ uri: pokemon.image }} style={styles.image} />
        )}

        <View style={styles.section}>
          <Text style={styles.title}>Types</Text>
          <View style={styles.row}>
            {pokemon.types.map((type: string) => (
              <Text key={type} style={styles.type}>
                {type}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>{pokemon.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Abilities</Text>
          {pokemon.abilities.map((a: string) => (
            <Text key={a} style={styles.item}>
              {a}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Stats</Text>
          {pokemon.stats.map((s: any) => (
            <Text key={s.name} style={styles.item}>
              {s.name}: {s.value}
            </Text>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 16,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
  image: {
    width: "100%",
    height: 280,
    resizeMode: "contain",
  },
  section: {
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  type: {
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#ddd",
    textTransform: "capitalize",
  },
  item: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
});
