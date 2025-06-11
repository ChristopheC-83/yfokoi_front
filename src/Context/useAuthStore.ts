import { decodeToken } from "@/services/authServices";
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
  isInitialized: boolean;
  initUserFromToken: () => void;
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
  isInitialized: false,
  initUserFromToken: () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ token: null, user: null, isInitialized: true });
      return;
    }

    const { expired, decoded } = decodeToken(token);

    if (expired || !decoded) {
      set({ token: null, user: null, isInitialized: true });
      localStorage.removeItem("token");
    } else {
      const user = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email || "",
      };
      set({ user, token, isInitialized: true });
    }
  },
}));
