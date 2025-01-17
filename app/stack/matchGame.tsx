import { Button } from "react-native-paper";
import { useCardsStore } from "@/utils/store";
import { SafeAreaView, StatusBar, View } from "react-native";
import { useState, useEffect } from "react";
import { CardProps } from "@/types/state";
import { getRandomElement, shuffleArray } from "@/utils/math";

const MatchGame = (
  questionType: "definitions" | "readings" = "definitions"
) => {
  const cards = [...useCardsStore((state) => state.cards)];
  const [words, setWords] = useState(
    Array.from({ length: 5 }, () => cards.pop()!)
  );
  const [answers, setAnswers] = useState<{ id: number; text: string }[]>([]);
  const [leftItem, setLeftItem] = useState<{ id: number; text: string } | null>(
    null
  );
  const [rigthItem, setRightItem] = useState<CardProps | null>(null);
  const [results, setResults] = useState<CardProps[]>([]);

  useEffect(() => {
    setAnswers(
      shuffleArray(
        words.map((word) => {
          return {
            id: word.id,
            text:
              questionType === "definitions"
                ? getRandomElement(word.dict_entry.definitions)
                : word.dict_entry.reading,
          };
        })
      )
    );
  }, [words]);

  useEffect(() => {
    if (leftItem && rigthItem) {
      if (leftItem.id === rigthItem.id) {
        setResults([...results, rigthItem]);
      }
      setLeftItem(null);
      setRightItem(null);
      if (results.length + 1 === words.length) {
        setResults([]);
        setWords(Array.from({ length: 5 }, () => cards.pop()!));
      }
    }
  }, [leftItem, rigthItem]);

  return (
    <SafeAreaView
      className="flex-row items-center gap-4 p-4 flex-1 dark:bg-slate-800 bg-gray-100"
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <View className="gap-4 flex-1">
        {words.map((word) => (
          <Button
            onPress={() =>
              word === rigthItem ? setRightItem(null) : setRightItem(word)
            }
            buttonColor={rigthItem === word ? "green" : "purple"}
            style={{ borderRadius: 0 }}
            key={word.id}
            disabled={results.some((result) => result === word)}
          >
            {results.some((result) => result === word)
              ? questionType === "definitions"
                ? word.dict_entry.reading
                : word.dict_entry.definitions[0]
              : word.dict_entry.word}
          </Button>
        ))}
      </View>
      <View className="gap-4">
        {answers.map((entry) => (
          <Button
            buttonColor={leftItem === entry ? "orange" : "purple"}
            style={{ borderRadius: 0 }}
            key={entry.id}
            onPress={() =>
              entry === leftItem ? setLeftItem(null) : setLeftItem(entry)
            }
            disabled={results.some((result) => result.id === entry.id)}
          >
            {entry.text}
          </Button>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default MatchGame;
