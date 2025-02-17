import { useCardsStore } from "@/utils/store";
import { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import Quiiz from "@/components/games/Quiz";
import { Button, IconButton, ProgressBar } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import SpellCheck from "@/components/games/SpellCheck";

const Study = () => {
  const cards = useCardsStore((state) => state.selectedCards);
  const updateStreak = useCardsStore((state) => state.updateStreak);
  const markLearned = useCardsStore((state) => state.markLearned);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState(cards[0]);

  const { game } = useLocalSearchParams();

  useEffect(() => {
    const newCard = cards[currentIndex];
    if (newCard.card.learned) {
      increaseIndex();
    } else {
      setCurrentCard(newCard);
    }
  }, [currentIndex]);

  const checkAnswer = (isCorrect: boolean) => {
    isCorrect && updateStreak([currentCard.card]);
    increaseIndex();
  };

  const increaseIndex = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("You learned all words in this deck!");
      setCurrentIndex(0);
    }
  };

  const renderGame = () => {
    if (game === "Quiz") {
      return <Quiiz card={currentCard} returnAnswer={checkAnswer} />;
    } else if (game === "Spelling") {
      return <SpellCheck relation={currentCard} returnAnswer={checkAnswer} />;
    }
  };

  return (
    <SafeAreaView
      className="flex-1 dark:bg-slate-800 bg-gray-100 p-4 justify-between"
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <View className="flex-row justify-between items-center">
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <Button
          onPress={() => {
            markLearned([currentCard.card]);
            increaseIndex();
          }}
        >
          Mark as learned
        </Button>
      </View>
      {renderGame()}
      <ProgressBar
        animatedValue={currentIndex / (cards.length - 1)}
        color="green"
      />
    </SafeAreaView>
  );
};

export default Study;
