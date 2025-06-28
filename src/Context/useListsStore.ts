
import { fetchAccessLists } from "@/services/lists/crudAccessLists";
import { fetchOwnedLists } from "@/services/lists/crudOwnedLists";
import type { AccessList, OwnedList } from "@/types/List";
import { create } from "zustand";

interface ListsStore {
  // selectedListId: number | null;
  // favoriteListId: number | null;
  ownedLists: OwnedList[];
  accessLists: AccessList[];
  setOwnedLists: (lists: OwnedList[]) => void;
  setAccessLists: (lists: AccessList[]) => void;
  fetchOwnedListsFromApi: (token: string) => Promise<void>;
  fetchAccessListsFromApi: (token: string) => Promise<void>;
  resetLists: () => void;
}


export const useListsStore = create<ListsStore>((set, get) => ({
  // selectedListId: null,
  // favoriteListId: null,
  ownedLists: [],
  accessLists: [],
  
  setOwnedLists: (lists) => {
  console.log("setOwnedLists déclenché");
  set({ ownedLists: lists });
},

  setAccessLists: (lists) => set({ accessLists: lists }),

   fetchOwnedListsFromApi: async (token: string) => {
    const current = get().ownedLists;
    if (current.length > 0) return; // éviter les fetchs inutiles

    try {
      const data = await fetchOwnedLists(token);
      set({ ownedLists: data });
    } catch (error) {
      console.error("Erreur lors du fetchOwnedLists", error);
      throw error;
    }
  },

  fetchAccessListsFromApi: async (token: string) => {
    const current = get().accessLists;
    if (current.length > 0) return; // éviter les fetchs inutiles

    try {
      const data = await fetchAccessLists(token);
      set({ accessLists: data });
    } catch (error) {
      console.error("Erreur lors du fetchAccessLists", error);
      throw error;
    }
  },

  resetLists: () => set({ ownedLists: [], accessLists: []})

}));