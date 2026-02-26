import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Pokedex",
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          headerTitle: "",
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
}
