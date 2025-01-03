import { useColorScheme } from "nativewind";
import { Text, TextProps } from "react-native";

export default function ThemedText({ ...props }: TextProps) {
  const { colorScheme } = useColorScheme();

  return (
    <Text
      {...props}
      style={{
        color: colorScheme === "light" ? "black" : "#dedede",
        ...props?.style,
      }}
    />
  );
}
