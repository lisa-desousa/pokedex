import { Text, StyleSheet } from "react-native";
import getPokemonTypeColor from "../utils/colorsByType";

interface TypeBadgeProps {
  type: string;
}

export default function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <Text
      style={[
        styles.type,
        { backgroundColor: getPokemonTypeColor(type) + "50" },
      ]}
    >
      {type}
    </Text>
  );
}

const styles = StyleSheet.create({
  type: {
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    overflow: "hidden",
    textTransform: "capitalize",
  },
});
