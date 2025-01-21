import { useState } from "react";
import { Button, Pressable, SafeAreaView, StatusBar, View } from "react-native";
import { Text } from "react-native-paper";

export default function Reader() {
  const book = [
    {
      lemma: "私-代名詞",
      pos: ["代名詞", "*", "*", "*"],
      pronunciation: "わたくし",
      pronunciation_raw: "わたくし",
      reading: "わたくし",
      reading_raw: "わたくし",
      surface: "私",
    },
    {
      lemma: "は",
      pos: ["助詞", "係助詞", "*", "*"],
      pronunciation: "わ",
      pronunciation_raw: "わ",
      reading: "は",
      reading_raw: "は",
      surface: "は",
    },
    {
      lemma: "レミ",
      pos: ["名詞", "固有名詞", "人名", "名"],
      pronunciation: "れみ",
      pronunciation_raw: "れみ",
      reading: "れみ",
      reading_raw: "れみ",
      surface: "レミ",
    },
    {
      lemma: "です",
      pos: ["助動詞", "*", "*", "*"],
      pronunciation: "です",
      pronunciation_raw: "です",
      reading: "です",
      reading_raw: "です",
      surface: "です",
    },
    {
      lemma: "です",
      pos: ["助動詞", "*", "*", "*"],
      pronunciation: "です",
      pronunciation_raw: "です",
      reading: "です",
      reading_raw: "です",
      surface: "です",
    },
    {
      lemma: "です",
      pos: ["助動詞", "*", "*", "*"],
      pronunciation: "です",
      pronunciation_raw: "です",
      reading: "です",
      reading_raw: "です",
      surface: "です",
    },
    {
      lemma: "です",
      pos: ["助動詞", "*", "*", "*"],
      pronunciation: "です",
      pronunciation_raw: "です",
      reading: "です",
      reading_raw: "です",
      surface: "です",
    },
    {
      lemma: "です",
      pos: ["助動詞", "*", "*", "*"],
      pronunciation: "です",
      pronunciation_raw: "です",
      reading: "です",
      reading_raw: "です",
      surface: "です",
    },
    {
      lemma: "です",
      pos: ["助動詞", "*", "*", "*"],
      pronunciation: "です",
      pronunciation_raw: "です",
      reading: "です",
      reading_raw: "です",
      surface: "です",
    },
  ];
  const colors = ["red", "green", "white", "gray", "purple"];

  const [word, setWord] = useState<null | (typeof book)[0]>(null);

  return (
    <SafeAreaView
      style={{
        paddingTop: StatusBar.currentHeight,
      }}
      className="dark:bg-gray-900 bg-yellow-200"
    >
      <View className="flex-row flex-wrap p-4 h-full">
        {book.map((item, key) => (
          <Pressable onPress={() => setWord(item)} key={key}>
            <Text style={{ color: colors[key % colors.length], fontSize: 24 }}>
              {item.lemma}
            </Text>
          </Pressable>
        ))}
        {word && (
          <View className="absolute w-screen min-h-48 bottom-0 bg-gray-400">
            <View className="flex-row dark:bg-slate-600">
              <Text className="text-green-900 text-2xl bg-green-400 px-2">
                4
              </Text>
              <Text className="text-center grow text-2xl">{word.lemma}</Text>
              <Button title="Close" onPress={() => setWord(null)} />
            </View>
            <View className="grow p-2">
              <Text>{word.reading}</Text>
            </View>
            <View className="flex-row justify-between p-2">
              <Button title="Mark learned" color={"green"} />
              <Button title="Add this sentense as example" color={"orange"} />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
