import { Text } from "react-native-paper";
import { useCardsStore } from "@/utils/store";
import { FlatList, Pressable, View } from "react-native";
import { CardProps } from "@/types/state";
import { getRandomElement, shuffleArray } from "@/utils/math";
import { useEffect, useState } from "react";

const DefenitionQuiz = ({
  card,
  examples,
  returnAnswer,
}: {
  card: CardProps;
  examples: string[];
  returnAnswer: (isCorrect: boolean) => void;
}) => {
  const cards = useCardsStore((state) => state.cards);

  const [pressedDef, setPressedDef] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const [entries, setEntries] = useState<string[]>([]);

  const checkAnswer = (answer: string) => {
    setPressedDef(answer);
    setIsCorrect(card.dict_entry.definitions.some((def) => answer === def));

    setTimeout(() => {
      returnAnswer(isCorrect);
    }, 1800);
  };

  useEffect(() => {
    setPressedDef("");
    setEntries(
      shuffleArray([
        getRandomElement(card.dict_entry.definitions),
        ...[...Array(3)].map(() => {
          const entry = getRandomElement(cards).dict_entry;
          return getRandomElement(entry.definitions);
        }),
      ])
    );
  }, [card]);

  return (
    <View className="flex-1 dark:bg-slate-800 bg-gray-100 gap-1">
      <Text className="text-4xl self-center font-bold mt-10">
        {card.dict_entry.word}
      </Text>
      <Text className="text-2xl self-center font-bold">
        {card.dict_entry.reading}
      </Text>

      <View className="flex-row flex-wrap justify-center items-stretch gap-4 pt-4">
        {entries.map((entry, key) => {
          console.log(entry, isCorrect, pressedDef);
          let background = "bg-orange-400";
          if (!isCorrect && pressedDef === entry) {
            background = "bg-red-900";
          }
          if (
            pressedDef !== "" &&
            card.dict_entry.definitions.some((def) => entry === def)
          ) {
            background = "bg-green-400";
          }
          return (
            <Pressable
              key={key}
              onPress={() => checkAnswer(entry)}
              disabled={pressedDef !== ""}
            >
              <Text className={"p-6 w-48 grow " + background}>{entry}</Text>
            </Pressable>
          );
        })}
      </View>
      <FlatList
        className="my-8"
        contentContainerClassName="gap-4"
        data={examples}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
};

export default DefenitionQuiz;
