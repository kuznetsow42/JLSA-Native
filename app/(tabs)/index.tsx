import { Image, SafeAreaView, StatusBar } from "react-native";
import { Text } from "react-native-paper";

export default function HomeScreen() {
  return (
    <SafeAreaView className="dark:bg-slate-700 h-full">
      <StatusBar backgroundColor="transparent" translucent />
      <Image
        source={require("@/assets/images/homeImage.jpeg")}
        className="w-full h-52"
      />
      <Text className="text-5xl text-center pt-4">Home Page</Text>
    </SafeAreaView>
  );
}
