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
import ThemedText from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserStore } from "@/utils/store";

export default function Settings() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { user, setUser } = useUserStore();
  console.log(user);

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
        <ThemedText className="text-white text-2xl">{title}</ThemedText>
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
        <ThemedText className="text-5xl text-center text-white">
          Settings
        </ThemedText>
        <Pressable onPress={() => setUser(null)}>
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
    </SafeAreaView>
  );
}
