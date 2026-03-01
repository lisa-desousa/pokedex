import { Pressable, StyleSheet, Text, View } from "react-native";

interface AutoCompleteDropdownProps {
  names: string[];
  visible: boolean;
  onSelect: (name: string) => void;
}

export default function AutoCompleteDropdown({
  names,
  visible,
  onSelect,
}: AutoCompleteDropdownProps) {
  if (!visible) return null;

  return (
    <View style={styles.dropdown}>
      {names.slice(0, 10).map(
        (
          name, //slice visar endast första 10 resultaten
        ) => (
          <Pressable key={name} onPress={() => onSelect(name)}>
            <Text style={styles.resultItem}>{name}</Text>
          </Pressable>
        ),
      )}
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
