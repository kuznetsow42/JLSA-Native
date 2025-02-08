import { DeckProps } from "@/types/state";
import axiosInstance from "@/utils/axios";
import { useCardsStore } from "@/utils/store";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  Pressable,
} from "react-native";
import { Button, Card, Dialog, Menu, Portal, Text } from "react-native-paper";

const Decks = () => {
  const { decks } = useCardsStore();
  const [openedeMenu, setOpenedMenu] = useState<null | number>(null);
  const [openedeDeck, setOpenedDeck] = useState<null | number>(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  const DeckList = ({
    list,
    margin = 0,
  }: {
    list: DeckProps[];
    margin?: number;
  }) => {
    return (
      <FlatList
        data={list}
        contentContainerClassName="gap-4"
        renderItem={({ item: deck }) => (
          <View className="gap-4 mb-4" style={{ marginHorizontal: margin }}>
            <Menu
              visible={openedeMenu === deck.id}
              onDismiss={() => setOpenedMenu(null)}
              anchorPosition="bottom"
              anchor={
                <Card
                  onLongPress={() => setOpenedMenu(deck.id)}
                  onPress={() =>
                    deck.sub_decks && openedeDeck === deck.id
                      ? setOpenedDeck(null)
                      : setOpenedDeck(deck.id)
                  }
                >
                  {deck.cover && <Card.Cover src={deck.cover} />}
                  <Card.Title title={deck.name} />
                  <Card.Content>
                    {deck.sub_decks && (
                      <Text>{deck.sub_decks.length} chapter(s)</Text>
                    )}
                    {deck.cards && <Text>{deck.cards.length} card(s)</Text>}
                  </Card.Content>
                </Card>
              }
            >
              <Menu.Item title="Streak" onPress={() => {}} />
            </Menu>
            {openedeDeck === deck.id && (
              <DeckList list={deck.sub_decks} margin={20} />
            )}
          </View>
        )}
      />
    );
  };

  return (
    <SafeAreaView
      className="dark:bg-slate-800 bg-gray-100 flex-1"
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <DeckList list={decks} />
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Content>
            <Text>ca</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                axiosInstance.delete("cards/decks/" + openedeMenu + "/");
              }}
            >
              Procede
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default Decks;
