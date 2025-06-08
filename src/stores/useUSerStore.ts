import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email?: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  isLoggedIn: () => boolean;
  getUserId: () => string | null;
  getUserName: () => string;
  getUserEmail: () => string;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  isLoggedIn: () => !!get().user,
  getUserId: () => get().user?.id || null,
  getUserName: () => get().user?.name || "",
  getUserEmail: () => get().user?.email || "",
}));
