import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

interface UserContextData {
  selectedListId: number | null;
  favoriteListId: number | null;
  countAskFriends: number;
}

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
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      const response = await fetch(
        "http://localhost/YOFOKOI/yfokoi_back/api_account/userContext",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: user.id }),
        }
      );

      const data = await response.json();

      console.log(data);
      console.log(response);



        if (response.ok) {
            // Successfully created or updated user context
            console.log("User context created or updated successfully:", data);
        } else {
            // Handle error response
            console.error("Failed to create or update user context:", data);
        }


    } catch (error) {
      console.error("Error creating or updating user context:", error);
    }
  },
}));
