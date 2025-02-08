import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-reanimated";

import "../styles.css";
import { useColorScheme } from "nativewind";
import { PaperProvider } from "react-native-paper";
import { useCardsStore, useUserStore } from "@/utils/store";
import { useNetInfo } from "@react-native-community/netinfo";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { fetchDecks, syncData, studiedCards } = useCardsStore();
  const { setColorScheme } = useColorScheme();
  const user = useUserStore((state) => state.user);
  const { isInternetReachable } = useNetInfo();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  AsyncStorage.getItem("scheme").then(
    (scheme) => scheme && setColorScheme(scheme)
  );

  useEffect(() => {
    if (user !== "Guest" && isInternetReachable) {
      fetchDecks();
    }
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, user, isInternetReachable]);

  useEffect(() => {
    if (user !== "Guest" && isInternetReachable && studiedCards.length) {
      syncData();
    }
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [isInternetReachable, studiedCards]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="stack" options={{ headerShown: false }} />
        <Stack.Screen name="authScreen" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
