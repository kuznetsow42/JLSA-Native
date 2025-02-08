export type UserProps =
  | {
      username: string;
      email: string;
      streak: number;
      avatar: string;
    }
  | "Guest";

export interface DeckProps {
  cards: CardProps[];
  cover: string;
  sub_decks: DeckProps[];
  name: string;
  id: number;
}

interface KanjiProps {
  id: number;
  kun: string[];
  on: string[];
  name_readings: string[];
  character: string;
  strokes: number;
  meanings: string[];
}

interface DictEntryProps {
  definitions: string[];
  id: number;
  kanji: KanjiProps[];
  reading: string;
  word: string;
}

export interface CardProps {
  created: string;
  dict_entry: DictEntryProps;
  id: number;
  learned: boolean;
  streak: number;
  deck: DeckProps;
  visited: string;
}
