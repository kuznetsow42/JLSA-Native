import { IconButton, Text, TextInput } from "react-native-paper";
import { FlatList, View } from "react-native";
import { SelectedCardProps } from "@/types/state";
import { useEffect, useState } from "react";
import KanjiPressable from "../KanjiPressable";

const SpellCheck = ({
  relation,
  returnAnswer,
}: {
  relation: SelectedCardProps;
  returnAnswer: (isCorrect: boolean) => void;
}) => {
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState("");

  const getDefenitions = (column: "left" | "right") => {
    let defenitions = relation.card.dict_entry.definitions;
    const center = defenitions.length / 2;
    if (column === "left") {
      return defenitions.slice(center);
    }
    return defenitions.slice(0, center);
  };

  const getHint = (index = 0) => {
    const word = relation.card.dict_entry.word;
    let letter = word.slice(index, index + 1);
    if (answer.at(index) === letter) {
      getHint(index + 1);
    } else {
      setHint(letter);
    }
  };

  useEffect(() => {
    if (
      answer === relation.card.dict_entry.reading ||
      answer === relation.card.dict_entry.word
    ) {
      setTimeout(() => {
        setAnswer("");
        setHint("");
        returnAnswer(true);
      }, 1000);
    }
  }, [answer]);

  return (
    <View className="flex-1 dark:bg-slate-800 bg-gray-100 py-16 justify-evenly">
      <View className="flex-row justify-center flex-start">
        <FlatList
          data={getDefenitions("left")}
          contentContainerClassName="flex gap-6"
          renderItem={({ item }) => <Text>{item}</Text>}
        />
        <FlatList
          data={getDefenitions("right")}
          contentContainerClassName="flex gap-6 items-center"
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      </View>
      {relation.card.dict_entry.kanji.find(
        (kanji) => kanji.character === hint
      ) ? (
        <KanjiPressable
          kanji={
            relation.card.dict_entry.kanji.find(
              (kanji) => kanji.character === hint
            )!
          }
          className="text-4xl self-center"
        />
      ) : (
        <Text className="text-4xl self-center">{hint}</Text>
      )}
      <TextInput
        onChangeText={setAnswer}
        value={answer}
        label="Kanji or hiragana"
      />
      <View className="flex-row justify-end ">
        <IconButton
          icon="eraser"
          onPress={() => {
            setAnswer("");
          }}
          iconColor="red"
        />
        <IconButton icon="lamp" onPress={() => getHint()} iconColor="yellow" />
      </View>
    </View>
  );
};
export default SpellCheck;
