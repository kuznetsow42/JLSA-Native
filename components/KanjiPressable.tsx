import { FlatList, Pressable, View } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";
import { KanjiProps } from "@/types/state";
import { useState } from "react";

const KanjiPressable = ({
  kanji,
  className,
}: {
  kanji: KanjiProps;
  className: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <Pressable onPress={() => setIsVisible((state) => !state)}>
        <Text className={className}>{kanji.character}</Text>
      </Pressable>
      <Portal>
        <Modal visible={isVisible} onDismiss={() => setIsVisible(false)}>
          <Pressable
            className="m-10 p-4 gap-6 dark:bg-[#230e44] bg-[#fffade]"
            onPress={() => setIsVisible(false)}
          >
            <Text className="text-xl">Kun readings</Text>
            <FlatList
              data={kanji.kun}
              renderItem={({ item }) => <Text>{item}</Text>}
            />
            <Text className="text-xl">On readings</Text>
            <FlatList
              data={kanji.on}
              renderItem={({ item }) => <Text>{item}</Text>}
            />
            {kanji.name_readings.length && <Text>Name readings</Text>}
            <FlatList
              data={kanji.name_readings}
              renderItem={({ item }) => <Text>{item}</Text>}
            />
            <Text className="text-xl">Meanings</Text>
            <FlatList
              data={kanji.meanings}
              renderItem={({ item }) => <Text>{item}</Text>}
            />
            <Text className="self-end">{kanji.strokes} Strokes</Text>
          </Pressable>
        </Modal>
      </Portal>
    </View>
  );
};

export default KanjiPressable;
