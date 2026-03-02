import { Pressable, StyleSheet, Text, View } from "react-native";
import { PokemonName } from "../types/pokemonTypes";

interface AutoCompleteDropdownProps {
  pokemons: PokemonName[];
  visible: boolean;
  onSelect: (name: string) => void;
}

export default function AutoCompleteDropdown({
  pokemons,
  visible,
  onSelect,
}: AutoCompleteDropdownProps) {
  if (!visible) return null;

  //slice visar endast första 10 resultaten
  return (
    <View style={styles.dropdown}>
      {pokemons.slice(0, 10).map((p) => (
        <Pressable key={p.id} onPress={() => onSelect(p.name)}>
          <Text style={styles.resultItem}>
            #{p.id} - {p.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    marginBottom: 8,
  },

  resultItem: {
    paddingVertical: 8,
    fontSize: 16,
    textTransform: "capitalize",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
