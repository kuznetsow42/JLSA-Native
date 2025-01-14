export type UserProps =
  | {
      username: string;
      email: string;
      streak: number;
      avatar: string;
    }
  | "Guest";

export interface TagProps {
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
  created: Date;
  dict_entry: DictEntryProps;
  id: number;
  learned: boolean;
  streak: number;
  tags: TagProps[];
  visited: Date;
}
