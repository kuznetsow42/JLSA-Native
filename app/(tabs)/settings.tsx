import { FontAwesome } from "@expo/vector-icons";
import { ReactNode } from "react";
import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  View,
} from "react-native";

import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useCardsStore, useUserStore } from "@/utils/store";
import { router } from "expo-router";
import { IconButton, Text } from "react-native-paper";

export default function Settings() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { user, setUser } = useUserStore();
  const { fetchDecks } = useCardsStore();

  const changeColorSheme = (sheme: "light" | "dark" | "system") => {
    setColorScheme(sheme);
    AsyncStorage.setItem("scheme", sheme);
  };

  const Setting = ({
    title,
    children,
  }: {
    title: string;
    children: ReactNode;
  }) => {
    return (
      <View className="flex-row p-1 justify-between items-center text-2xl">
        <Text className="text-white text-2xl">{title}</Text>
        {children}
      </View>
    );
  };

  return (
    <SafeAreaView
      className="h-screen gap-4 p-2"
      style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: colorScheme === "dark" ? "#1a0018" : "white",
      }}
    >
      <View className="flex-row p-1 justify-between">
        <Text className="text-5xl text-center text-white">Settings</Text>
        <Pressable
          onPress={() => {
            if (user === "Guest") {
              router.push("/authScreen");
            } else {
              setUser("Guest");
              SecureStore.deleteItemAsync("token");
            }
          }}
        >
          {user?.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              width={62}
              height={82}
              resizeMode="cover"
            />
          ) : (
            <FontAwesome
              name="user"
              color={colorScheme === "dark" ? "white" : "purple"}
              size={42}
            />
          )}
        </Pressable>
      </View>
      <Setting title="Theme">
        <View className="flex-row gap-4">
          <Button
            title="Light"
            onPress={() => changeColorSheme("light")}
            disabled={colorScheme === "light"}
          />
          <Button
            title="Dark"
            disabled={colorScheme === "dark"}
            onPress={() => changeColorSheme("dark")}
          />
        </View>
      </Setting>
      <Setting title="Notifications">
        <Button title="turn on" />
      </Setting>
      <Setting title="Sync cards">
        <IconButton
          icon="refresh"
          iconColor="blue"
          size={36}
          onPress={() => fetchDecks()}
        />
      </Setting>
    </SafeAreaView>
  );
}
