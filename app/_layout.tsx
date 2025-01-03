import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-reanimated";

import "../styles.css";
import { useColorScheme } from "nativewind";
import AuthScreen from "./authScreen";
import { useUserStore } from "@/utils/store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { setColorScheme } = useColorScheme();
  const user = useUserStore((state) => state.user);

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

  return !user ? (
    <AuthScreen />
  ) : (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="stack" options={{ headerShown: false }} />
    </Stack>
  );
}
