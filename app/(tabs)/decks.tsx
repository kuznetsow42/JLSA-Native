import { useCardsStore } from "@/utils/store";
import { useState } from "react";
import { SafeAreaView, StatusBar, FlatList } from "react-native";
import { Card, Text } from "react-native-paper";

const Decks = () => {
  const { decks, selectedDeck, choseDeck } = useCardsStore();
  const [openedDeck, setOpenedDeck] = useState<null | number>(null);

  return (
    <SafeAreaView
      className="dark:bg-slate-800 bg-gray-100 flex-1"
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <FlatList
        data={decks}
        contentContainerClassName="gap-4"
        renderItem={({ item: deck }) => (
          <Card
            onPress={() =>
              openedDeck === deck.id
                ? setOpenedDeck(null)
                : setOpenedDeck(deck.id)
            }
          >
            <Card.Cover src={deck.cover} />
            <Card.Title title={deck.name} />
            <Card.Content>
              <Text>{deck.sub_decks.length} chapter(s)</Text>
              <FlatList
                className={`${openedDeck !== deck.id && "hidden"} mt-10 gap-4`}
                data={deck.sub_decks}
                renderItem={({ item: subDeck }) => (
                  <Card
                    onPress={() => choseDeck(subDeck)}
                    contentStyle={{
                      backgroundColor:
                        selectedDeck?.id === subDeck.id ? "green" : "gray",
                    }}
                  >
                    <Card.Title title={subDeck.name} />
                    <Card.Content>
                      <Text>{subDeck.card_relations.length} card(s)</Text>
                    </Card.Content>
                  </Card>
                )}
              />
            </Card.Content>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

export default Decks;
