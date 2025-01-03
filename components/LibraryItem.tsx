import { ReactNode } from "react";
import { Pressable } from "react-native";

export default function LibraryItem({
  children,
  onPress,
}: {
  children: ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="dark:bg-slate-700 bg-green-300 border w-48 grow"
    >
      {children}
    </Pressable>
  );
}
