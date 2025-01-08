import { ReactNode } from "react";
import { Pressable } from "react-native";
import ThemedText from "./ThemedText";

export default function Button({
  onPress,
  className,
  children,
}: {
  onPress: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Pressable
      className={`${className} gap-4 p-4 flex-row justify-between`}
      onPress={onPress}
    >
      <ThemedText className="text-2xl">{children}</ThemedText>
    </Pressable>
  );
}
