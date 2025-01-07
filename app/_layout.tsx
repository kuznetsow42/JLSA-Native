import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-reanimated";

import "../styles.css";
import { useColorScheme } from "nativewind";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { setColorScheme } = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  AsyncStorage.getItem("scheme").then(
    (scheme) => scheme && setColorScheme(scheme)
  );

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="stack" options={{ headerShown: false }} />
      <Stack.Screen name="authScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
