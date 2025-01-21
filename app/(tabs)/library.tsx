import LibraryItem from "@/components/LibraryItem";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Image, SafeAreaView, StatusBar, View } from "react-native";

import * as Picker from "expo-document-picker";
import { useColorScheme } from "nativewind";
import { Text } from "react-native-paper";

export default function Library() {
  type ItemProp = { id: string; title: string; cover: string };

  const { colorScheme } = useColorScheme();

  const library = [
    {
      id: "1321431",
      cover:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.mYcP4DZXN4g19DVXlwIS3wHaK8%26pid%3DApi&f=1&ipt=a3dd19eeab3bed4f94ef55d4d57fc3579812eb1f7db4c1b4c1675e1576c2a5a8&ipo=images",
      title: "Book 1",
    },
    {
      id: "2",
      cover:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.j5hzWvaUEN5nSv6LThXcUgHaGW%26pid%3DApi&f=1&ipt=cbc6dd2748bbcdc2ca16f43801ba6d8bdfacc86015aa29b7c03eff2f83737068&ipo=images",
      title: "Book 2",
    },
    {
      id: "3",
      cover:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.j9MMPaq1izAFBv470QWtPwHaKh%26pid%3DApi&f=1&ipt=79471781f40240b72d0c5b0f1fef820eb039279bf9edb461273bda6be66b5dae&ipo=images",
      title: "Book ddddddddddddddddd3",
    },
    {
      id: "4",
      cover:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.IfZ7Vwjim2BZXJqlTl2EzAHaJE%26pid%3DApi&f=1&ipt=dc64dee3a36a3be9b8d9a0ec54962145b32b7895d2f702fc051960356294aba9&ipo=images",

      title: "Book 4",
    },
  ];
  const [books, setBooks] = useState(library);

  const getBook = (file: Picker.DocumentPickerResult) => {
    setBooks([
      ...books,
      {
        id: "18",
        cover:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.I3AmPlEro2fibdCm5A5UyAHaKg%26pid%3DApi&f=1&ipt=8a5bc53f52b6769bb642220d80c4c26ad3d280fc76f171f1642257021b43d79a&ipo=images",

        title: "Hana San",
      },
    ]);
  };

  const RenderItem = (item: ItemProp) => {
    return (
      <LibraryItem onPress={() => router.push("/stack/reader")}>
        <Image source={{ uri: item.cover }} className="h-56" />
        <Text className="text-2xl text-center">{item.title}</Text>
      </LibraryItem>
    );
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: colorScheme === "dark" ? "#1a0018" : "white",
        height: "100%",
      }}
    >
      <FlatList
        contentContainerClassName="p-2 flex-row flex-wrap justify-around gap-1"
        ListHeaderComponent={
          <LibraryItem
            onPress={() =>
              Picker.getDocumentAsync().then((res) => getBook(res))
            }
          >
            <View className="flex-1 items-center justify-center pb-4">
              <FontAwesome name="plus-circle" size={68} color="white" />
              <Text className="text-2xl ">Add book</Text>
            </View>
          </LibraryItem>
        }
        data={books}
        renderItem={({ item }) => RenderItem(item)}
      />
    </SafeAreaView>
  );
}
