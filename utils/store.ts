import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as SecureStore from "expo-secure-store";
import axiosInstance from './axios';

type User = { username: string; email: string; streak: number; avatar: string } | "Guest";
type UserStore = { user: User; setUser: (user: User) => void };

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
        setItem: async (name: string, value: string) => await SecureStore.setItemAsync(name, value),
        removeItem: async (name: string) => await SecureStore.deleteItemAsync(name),
      })),
    }
  )
);


