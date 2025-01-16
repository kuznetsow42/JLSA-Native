import { Button, Text } from "react-native-paper";
import { useCardsStore } from "@/utils/store";
import { View } from "react-native";
import { CardProps } from "@/types/state";
import { getRandomElement, shuffleArray } from "@/utils/math";
import { useState } from "react";

const Quiz = ({
  card,
  returnAnswer,
}: {
  card: CardProps;
  returnAnswer: (isCorrect: boolean) => void;
}) => {
  const cards = useCardsStore((state) => state.cards);
  const entries = shuffleArray([
    card.dict_entry,
    ...[...Array(3)].map(() => getRandomElement(cards).dict_entry),
  ]);

  const [answer, setAnswer] = useState("");

  const checkAnswer = (reading: string) => {
    setAnswer(reading);
    setTimeout(() => {
      setAnswer("");
      returnAnswer(reading === card.dict_entry.reading);
    }, 1800);
  };

  const ResultView = () => {
    return (
      <View className="flex-1 dark:bg-slate-800 bg-gray-100 p-4">
        <View className="flex-1 justify-center">
          <Text className="text-4xl text-center font-bold">
            {card.dict_entry.word}
          </Text>
          {answer !== card.dict_entry.reading ? (
            <View>
              <Text className="text-4xl text-center font-bold">
                {card.dict_entry.reading}
              </Text>
              <Text
                className="text-4xl text-center font-bold"
                style={{ color: "red" }}
              >
                {answer}
              </Text>
            </View>
          ) : (
            <Text
              className="text-4xl text-center font-bold"
              style={{ color: "green" }}
            >
              {card.dict_entry.reading}
            </Text>
          )}
        </View>
      </View>
    );
  };
  const QuizView = () => {
    return (
      <View className="flex-1 dark:bg-slate-800 bg-gray-100 p-4">
        <Text className="text-center">Select right reading</Text>
        <View className="flex-1 justify-center">
          <Text className="text-4xl text-center font-bold">
            {card.dict_entry.word}
          </Text>
          <View className="flex-row flex-wrap justify-center items-center gap-4 pt-10">
            {entries.map((item, key) => (
              <Button
                key={key}
                onPress={() => checkAnswer(item.reading)}
                mode="contained"
                className="w-1/3 grow"
                style={{ borderRadius: 0 }}
              >
                {item.reading}
              </Button>
            ))}
          </View>
        </View>
      </View>
    );
  };
  return answer ? <ResultView /> : <QuizView />;
};

export default Quiz;
