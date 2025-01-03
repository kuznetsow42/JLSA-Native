import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";

import Button from "@/components/Buttons";
import ThemedText from "@/components/ThemedText";
import { axiosInstance } from "@/utils/axios";
import * as SecureStore from "expo-secure-store";
import { useUserStore } from "@/utils/store";

export default function AuthScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const axios = axiosInstance;
  const { user, setUser } = useUserStore();

  const Register = () => {
    axios
      .post("users/auth/register/", {
        username: username,
        password: password,
        client: "JLSANative!",
      })
      .catch((error) => {
        alert(
          error?.response?.data?.username
            ? "Username is not valid"
            : "Password is not valid"
        );
      })
      .then((response) => console.log(response.data));
  };

  const SignIn = () => {
    axios
      .post("http://192.168.1.100:8000/api/v1/users/auth/login/", {
        username: username,
        password: password,
        client: "JLSANative!",
      })
      .catch((error) => {
        alert(
          error?.response?.data?.non_field_errors
            ? "Wrong credentials"
            : "Something went wrong"
        );
      })

      .then((response) => {
        setUser(response.data.user);
        SecureStore.setItemAsync("jwt", response.data.token);
      });
  };

  return (
    <SafeAreaView>
      <ImageBackground
        className="bg-red-100 h-full w-full flex p-16 justify-evenly "
        source={require("../assets/images/backgrounds/auth.jpeg")}
      >
        <ThemedText className="text-center text-5xl text-white p-6 bg-[#aeff0047]">
          JLSA
        </ThemedText>
        <View className="gap-4">
          <Button
            onPress={() => setUser({ usename: "Guest" })}
            colors="dark:bg-gray-600 bg-white"
          >
            Continue as guest
          </Button>
          <Pressable className="bg-gray-900 gap-4 p-4 flex-row">
            <ThemedText className="text-2xl">Continue as guest</ThemedText>
          </Pressable>
          <Pressable className="bg-blue-900 gap-4 p-4 flex-row justify-between">
            <ThemedText className="text-2xl">Use GitHub</ThemedText>
            <FontAwesome name="github" size={28} />
          </Pressable>
        </View>

        <View className="gap-4">
          <TextInput
            placeholder="Username"
            placeholderClassName="dark:text-white"
            className="text-2xl dark:bg-gray-900 bg-white dark:text-white"
            autoComplete="username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            placeholderClassName="dark:text-white"
            placeholder="Password"
            secureTextEntry
            autoComplete="current-password"
            className="text-2xl dark:bg-gray-900 bg-white dark:text-white"
            value={password}
            maxFontSizeMultiplier={0}
            onChangeText={setPassword}
          />
          <View className="flex-row  justify-around">
            <Pressable
              className="bg-red-500 gap-4 p-4 flex-row justify-between"
              onPress={Register}
            >
              <ThemedText className="text-2xl">SignUp</ThemedText>
            </Pressable>
            <Button colors="bg-green-700" onPress={SignIn}>
              Sign In
            </Button>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
