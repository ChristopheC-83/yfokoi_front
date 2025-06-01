import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

type NullableUser = User | null;
type NullableToken = string | null;

interface AuthState {
  token: NullableToken;
  user: NullableUser;
  setToken: (token: NullableToken) => void;
  setUser: (user: NullableUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    set({ token });
  },
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));
