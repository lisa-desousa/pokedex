import { TextInput, StyleSheet } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <TextInput
      placeholder="Search for Pokémon by name or id..."
      placeholderTextColor="#4a4a4a"
      value={value}
      onChangeText={onChangeText}
      style={styles.search}
    />
  );
}

const styles = StyleSheet.create({
  search: {
    margin: 16,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },
});
