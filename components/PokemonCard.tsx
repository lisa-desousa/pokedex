import { Image, Pressable, StyleSheet, Text } from "react-native";
import { Pokemon } from "../types/pokemonTypes";
import getPokemonTypeColor from "../utils/colorsByType";

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress?: () => void; //kortet är klickbart i sig, men vad som sker vid klick bestäms utifrån var kortet används. Grid skickar den specifika logiken (i detta fall navigation) som props till index
}

export default function PokemonCard({ pokemon, onPress }: PokemonCardProps) {
  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: getPokemonTypeColor(pokemon.types?.[0] ?? "") + "50",
        },
      ]}
      onPress={onPress}
    >
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text style={styles.id}>#{pokemon.id}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 20,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: 6,
    textAlign: "center",
    color: "#333",
  },
  id: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    textAlign: "center",
  },
});
