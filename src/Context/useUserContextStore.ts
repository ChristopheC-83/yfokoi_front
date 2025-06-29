import { create } from "zustand";
import type { UserContextData } from "@/types/User";
import { fetchUserContextFromApi } from "@/services/userContext/createUserContext";
import { useAuthStore } from "./useAuthStore";

interface UserContextStore {
  selectedListId: number | null;
  favoriteListId: number | null;
  countAskFriends: number;
  lastUpdate: Date | null;
  userId: string | number | null;

  setSelectedListId: (id: number | null) => void;
  setFavoriteListId: (id: number | null) => void;
  setCountAskFriends: (count: number) => void;
  setLastUpdate: (date: Date | null) => void;

  resetUserContext: () => void;
  createOrUpdateUserContext: () => Promise<void>;
}

interface BackendUserContext {
  selected_list_id?: number | null;
  favorite_list_id?: number | null;
  count_ask_friends?: number;
  last_update?: string | Date | null;
  user_id?: string | number | null;
}

function mapBackendContextToFrontend(
  data: BackendUserContext
): UserContextData {
  return {
    selectedListId: data.selected_list_id ?? null,
    favoriteListId: data.favorite_list_id ?? null,
    countAskFriends: data.count_ask_friends ?? 0,
    lastUpdate: data.last_update
      ? (typeof data.last_update === "string"
          ? new Date(data.last_update)
          : data.last_update instanceof Date
            ? data.last_update
            : null)
      : null,
    userId: data.user_id ?? null,
  };
}

export const useUserContextStore = create<UserContextStore>((set) => ({
  selectedListId: null,
  favoriteListId: null,
  countAskFriends: 0,
  lastUpdate: null,
  userId: null,

  setSelectedListId: (id) => set({ selectedListId: id }),
  setFavoriteListId: (id) => set({ favoriteListId: id }),
  setCountAskFriends: (count) => set({ countAskFriends: count }),
  setLastUpdate: (date) => set({ lastUpdate: date }),

  resetUserContext: () =>
    set({
      selectedListId: null,
      favoriteListId: null,
      countAskFriends: 0,
      lastUpdate: null,
      userId: null,
    }),

  createOrUpdateUserContext: async () => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      console.error("⛔ Pas de token d'authentification !");
      return;
    }

    const data = await fetchUserContextFromApi(token);
    console.log("🔄 Contexte utilisateur récupéré :", data);

    // C’est LA ligne qui change tout :
    const mapped = mapBackendContextToFrontend(data);
    console.log("🔄 Contexte utilisateur mappé :", mapped);

    set({
      selectedListId: mapped.selectedListId,
      favoriteListId: mapped.favoriteListId,
      countAskFriends: mapped.countAskFriends,
      lastUpdate: mapped.lastUpdate,
      userId: mapped.userId,
    });

  } catch (error) {
    console.error(
      "⛔ Erreur lors de la mise à jour du contexte utilisateur :",
      error
    );
  }
},

}));
