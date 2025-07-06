import type { User } from "@/types/User";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  isLoggedIn: () => boolean;
  getUserId: () => string | number | null;
  getUserName: () => string | null;
  getUserEmail: () => string | undefined;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  isLoggedIn: () => !!get().user,
  getUserId: () => get().user?.id ?? null,
  getUserName: () => get().user?.name ?? null,
  getUserEmail: () => get().user?.email, 
}))
