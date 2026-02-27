import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import getPokemonTypeColor from "./colorsByType";

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
    //fetch pokemon och sätt i state
    fetchPokemonDetails(params.name as string).then(setPokemon);
  }, [params.name]);

  // Fetch function
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

    // Return enligt interface
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default,
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
        <Text style={{ textAlign: "center", fontSize: 20 }}>#{pokemon.id}</Text>

        {pokemon.image && (
          <View
            style={{
              backgroundColor: getPokemonTypeColor(pokemon.types[0]) + "50",
              borderRadius: 20,
              padding: 30,
              marginHorizontal: 10,
            }}
          >
            <Image source={{ uri: pokemon.image }} style={styles.image} />
          </View>
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
    gap: 15,
    padding: 16,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
    marginBottom: -10,
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
