import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import axiosInstance from "./axios";
import { CardProps, TagProps, UserProps } from "@/types/state";

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
      storage: createJSONStorage(() => ({
        getItem: async (name: string) => await SecureStore.getItemAsync(name),
        setItem: async (name: string, value: string) =>
          await SecureStore.setItemAsync(name, value),
        removeItem: async (name: string) =>
          await SecureStore.deleteItemAsync(name),
      })),
    }
  )
);

interface CardsStore {
  cards: CardProps[];
  cards_count: number;
  tags: TagProps[];
  getCards: (filters: string) => void;
  getTags: () => void;
}

export const useCardsStore = create<CardsStore>((set, get) => ({
  cards: [],
  cards_count: 0,
  tags: [],
  getCards: (filters) => {
    axiosInstance.get(`cards/?${filters}`).then((response) => {
      set({ cards: response.data.results, cards_count: response.data.count });
    });
  },
  getTags: () => {
    axiosInstance.get("cards/get_tags/").then((response) => {
      set({ tags: response.data });
    });
  },
}));
