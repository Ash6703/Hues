import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Tiny5-Regular": require("../assets/fonts/Tiny5-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      />
      <StatusBar style="light"/>
    </>
  );
}
