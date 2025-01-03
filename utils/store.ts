import {create} from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user: {username: string, email: string, streak: number, avatar: string}) => set({ user: user }),
}));

