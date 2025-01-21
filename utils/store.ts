import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CardProps, TagProps, UserProps } from "@/types/state";
import { FileSystemAPI, SecureStoreAPI } from "./storeAPIs";

interface UserStore {
  user: UserProps;
  setUser: (user: UserProps) => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: "Guest",
      setUser: (user) => set({ user }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => SecureStoreAPI),
    }
  )
);

interface CardsStore {
  cards: CardProps[];
  tags: TagProps[];
  setCards: (cards: CardProps[]) => void;
  setTags: (tags: TagProps[]) => void;
}

export const useCardsStore = create(
  persist<CardsStore>(
    (set, get) => ({
      cards: [],
      tags: [],
      setCards: (cards) => {
        set({ cards });
      },
      setTags: (tags) => {
        set({ tags });
      },
    }),
    {
      name: "cards",
      storage: createJSONStorage(() => FileSystemAPI),
    }
  )
);
