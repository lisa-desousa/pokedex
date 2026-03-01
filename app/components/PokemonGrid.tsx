import { ScrollView, StyleSheet } from "react-native";
import { Pokemon } from "../types/pokemonTypes";
import PokemonCard from "./PokemonCard";

interface PokemonGridProps {
  pokemons: Pokemon[];
  onCardPress?: (pokemon: Pokemon) => void;
}

export default function PokemonGrid({
  pokemons,
  onCardPress,
}: PokemonGridProps) {
  return (
    <ScrollView contentContainerStyle={styles.grid}>
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
          onPress={() => onCardPress?.(pokemon)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: 12,
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
