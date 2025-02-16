export type UserProps =
  | {
      username: string;
      email: string;
      streak: number;
      avatar: string;
    }
  | "Guest";

export interface CardRelationProps {
  card: number;
  examples: string[];
  frequency: number;
}

export interface SelectedCardsProps {
  card: CardProps;
  examples: string[];
  frequency: number;
}

export interface SubDeckProps {
  name: string;
  id: number;
  card_relations: CardRelationProps[];
}

export interface DeckProps {
  cover: string;
  sub_decks: SubDeckProps[];
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
