import { ReactNode } from "react";
import { Pressable, Text } from "react-native";

export default function Button({
  onPress,
  colors,
  children,
}: {
  onPress: () => void;
  colors?: string;
  children: ReactNode;
}) {
  return (
    <Pressable
      className={`${colors} gap-4 p-4 flex-row justify-between`}
      onPress={onPress}
    >
      <Text className="text-2xl">{children}</Text>
    </Pressable>
  );
}
