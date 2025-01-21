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
  studiedCards: CardProps[];
  updated: Date | null;
  setCards: (cards: CardProps[]) => void;
  setTags: (tags: TagProps[]) => void;
  updateStreak: (cardsToUpdate: CardProps[]) => void;
  addStudiedCard: (card: CardProps) => void;
  clearStudiedCards: () => void;
}

export const useCardsStore = create(
  persist<CardsStore>(
    (set, get) => ({
      cards: [],
      tags: [],
      studiedCards: [],
      updated: null,
      setCards: (cards) => {
        set({ cards });
      },
      setTags: (tags) => {
        set({ tags });
      },
      clearStudiedCards: () => set({ studiedCards: [] }),
      addStudiedCard: (card) =>
        set({ studiedCards: [...get().studiedCards, card] }),
      updateStreak: async (cardsToUpdate) => {
        set({
          cards: get().cards.map((card) => {
            if (
              cardsToUpdate.some((cardToUpdate) => card.id === cardToUpdate.id)
            ) {
              get().addStudiedCard(card);
              return { ...card, streak: card.streak + 1 };
            }
            return card;
          }),
        });
      },
    }),
    {
      name: "cards",
      storage: createJSONStorage(() => FileSystemAPI),
    }
  )
);
