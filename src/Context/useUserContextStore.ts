import { create } from "zustand";
import type { UserContextData } from "@/types/User";
import { URL_API } from "@/utils/env";

// interface UserContextData {
//   selectedListId: number | null;
//   favoriteListId: number | null;
//   countAskFriends: number;
// }

interface UserContextStore {
  userContext: UserContextData;
  setUserContext: (context: Partial<UserContextData>) => void;
  resetUserContext: () => void;
  createOrUpdateUserContext: () => Promise<void>;
}

export const useUserContextStore = create<UserContextStore>((set) => ({
  userContext: {
    selectedListId: null,
    favoriteListId: null,
    countAskFriends: 0,
  },
  setUserContext: (partialContext) =>
    set((state) => ({
      userContext: {
        ...state.userContext,
        ...partialContext,
      },
    })),

  resetUserContext: () =>
    set({
      userContext: {
        selectedListId: null,
        favoriteListId: null,
        countAskFriends: 0,
      },
    }),

  createOrUpdateUserContext: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Pas de token d'authentification !");
      return;
    }
    try {
      const response = await fetch(`${URL_API}/api_account/userContext`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User context created or updated successfully:", data);
      } else {
        console.error("Failed to create or update user context:", data);
      }
    } catch (error) {
      console.error("Error creating or updating user context:", error);
    }
  },


}));
