import { create } from "zustand";
import type { ListShare } from "@/types/ListShare";
import {
  fetchAllSharesFromApi,
  createShare,
  updateShare,
  removeShare,
} from "@/services/sharings/sharesApi";
import { useAuthStore } from "../users/useAuthStore";

interface ShareState {
  shares: ListShare[];
  isLoading: boolean;
  hasFetched: boolean;

  fetchAllShares: () => Promise<void>;
  addShare: (share: Omit<ListShare, "author_name">) => Promise<void>;
  updateShare: (listId: number, userId: number, access: number) => Promise<void>;
  removeShare: (listId: number, userId: number) => Promise<void>;
  reset: () => void;
}

export const useSharesStore = create<ShareState>((set, get) => ({
  shares: [],
  isLoading: false,
  hasFetched: false,

  fetchAllShares: async () => {
    const { hasFetched } = get();
    if (hasFetched) return;
    set({ isLoading: true });
    try {
      const shares = await fetchAllSharesFromApi(); 
      set({ shares, hasFetched: true });
    } catch (err) {
      console.error("Erreur lors du fetch des partages :", err);
    } finally {
      set({ isLoading: false });
    }
  },

  addShare: async (share) => {
  try {
    const user = useAuthStore.getState().user!; 

    const shareToAdd = {
      ...share,
      author_id: Number(user.id),
      author_name: user.name,
    };

    await createShare(shareToAdd);

    set((state) => ({
      shares: [...state.shares, shareToAdd],
    }));
  } catch (err) {
    console.error("Erreur lors du partage :", err);
  }
},

  updateShare: async (listId, userId, access) => {
  try {
    await updateShare(listId, userId, access);

    set((state) => ({
      shares: state.shares.map((s) => {
        if (s.id_list === listId && s.user_id === userId) {
          return {
            ...s,
            access_level: access as 1 | 2 | 3 | 4, 
          };
        }
        return s;
      }),
    }));
  } catch (err) {
    console.error("Erreur lors de la mise à jour du partage :", err);
  }
},


  removeShare: async (listId, userId) => {
    try {
      await removeShare(listId, userId);
      set((state) => ({
        shares: state.shares.filter(
          (s) => !(s.id_list === listId && s.user_id === userId)
        ),
      }));
    } catch (err) {
      console.error("Erreur lors de la suppression du partage :", err);
    }
  },

  reset: () => {
    set({
      shares: [],
      isLoading: false,
      hasFetched: false,
    });
  },
}));
