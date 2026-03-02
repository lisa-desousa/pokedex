import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import Section from "../components/Section";
import TypeBadge from "../components/TypeBadge";
import { Pokemon } from "../types/pokemonTypes";
import { fetchPokemonDetails } from "../utils/api";
import getPokemonTypeColor from "../utils/colorsByType";

interface PokemonStat {
  name: string;
  value: number;
}

export default function Details() {
  const params = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetchPokemonDetails(params.name as string).then(setPokemon);
  }, [params.name]);

  if (!pokemon) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text style={{ textAlign: "center", fontSize: 20 }}>#{pokemon.id}</Text>

      {pokemon.image && (
        <View
          style={{
            backgroundColor:
              getPokemonTypeColor(pokemon.types?.[0] ?? "") + "50",
            borderRadius: 20,
            padding: 30,
            marginHorizontal: 10,
          }}
        >
          <Image source={{ uri: pokemon.image }} style={styles.image} />
        </View>
      )}

      <Section title="Types">
        <View style={styles.row}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>
      </Section>

      <Section title="Description">
        <Text style={styles.description}>{pokemon.description}</Text>
      </Section>

      <Section title="Abilities">
        {pokemon.abilities.map((a: string) => (
          <Text key={a} style={styles.item}>
            {a}
          </Text>
        ))}
      </Section>

      <Section title="Stats">
        {pokemon.stats.map((s: PokemonStat) => (
          <Text key={s.name} style={styles.item}>
            {s.name}: {s.value}
          </Text>
        ))}
      </Section>
    </ScrollView>
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
