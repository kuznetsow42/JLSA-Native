import { Href, Link } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";
import { Text } from "react-native-paper";

const Games = () => {
  const GameLink = ({ path, title }: { path: Href; title: string }) => {
    return (
      <Link href={path} className="p-10 bg-red-800 w-48">
        <Text style={{ textAlign: "center" }}>{title}</Text>
      </Link>
    );
  };

  return (
    <SafeAreaView
      className="dark:bg-slate-800 bg-gray-100 px-4  py-2 flex-1 flex-row flex-wrap justify-center gap-4"
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <GameLink path="/stack/matchGame" title="Matching" />
      <GameLink path="/stack/study?game=Quiz" title="Quiz" />
      <GameLink path="/stack/study?game=Spelling" title="Writing" />
    </SafeAreaView>
  );
};

export default Games;
