import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  CardProps,
  DeckProps,
  SelectedCardProps,
  SubDeckProps,
  UserProps,
} from "@/types/state";
import { FileSystemAPI, SecureStoreAPI } from "./storeAPIs";
import axiosInstance from "./axios";

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
  decks: DeckProps[];
  selectedDeck: SubDeckProps | null;
  selectedCards: SelectedCardProps[];
  studiedCards: CardProps[];
  updated: number | null;
  fetchDecks: () => void;
  deleteDeck: (id: number) => void;
  choseDeck: (deck: SubDeckProps) => void;
  updateStreak: (cardsToUpdate: CardProps[]) => void;
  addStudiedCard: (card: CardProps) => void;
  clearStudiedCards: () => void;
  syncData: () => void;
}

export const useCardsStore = create(
  persist<CardsStore>(
    (set, get) => ({
      cards: [],
      decks: [],
      selectedDeck: null,
      selectedCards: [],
      studiedCards: [],
      updated: null,
      fetchDecks: () => {
        axiosInstance
          .get("cards/")
          .then((response) => set({ cards: response.data }));
        axiosInstance
          .get("cards/decks/")
          .then((response) => set({ decks: response.data }));
        set({ updated: Date.now() });
      },
      deleteDeck: (id) => {
        axiosInstance.delete(`cards/decks/${id}/`);
      },
      choseDeck: async (deck) => {
        set({ selectedDeck: deck });
        set((state) => {
          return {
            selectedCards: deck.card_relations.map((relation) => {
              return {
                ...relation,
                card: state.cards.find((card) => card.id == relation.card)!,
              };
            }),
          };
        });
      },

      clearStudiedCards: () => set({ studiedCards: [] }),
      addStudiedCard: (card) =>
        set({
          studiedCards: [
            ...get().studiedCards.filter((sCard) => sCard.id !== card.id),
            card,
          ],
        }),
      updateStreak: async (cardsToUpdate) => {
        set({
          cards: get().cards.map((card) => {
            if (
              cardsToUpdate.some((cardToUpdate) => card.id === cardToUpdate.id)
            ) {
              const updatedCard = {
                ...card,
                streak: card.streak + 1,
                visited: new Date().toISOString(),
              };
              get().addStudiedCard(updatedCard);
              return updatedCard;
            }
            return card;
          }),
        });
      },
      syncData: () => {
        const cards = get().studiedCards;
        cards.length &&
          axiosInstance
            .patch("cards/sync/", {
              cards: cards,
            })
            .then(() => {
              get().clearStudiedCards();
            });
      },
    }),
    {
      name: "cards",
      storage: createJSONStorage(() => FileSystemAPI),
    }
  )
);
