import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface SectionProps {
  title: string;
  children: ReactNode; //React.ReactNode är en TypeScript-typ som används för props som ska innehålla något som kan renderas i JSX (dvs typ vad som helst). Det används när man inte vill specificera vilket innehåll som kommer att finnas i komponenten, utan bara att det kommer att finnas något som kan renderas (text, element, komponenter, etc).
}

export default function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
