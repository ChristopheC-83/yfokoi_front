import { create } from "zustand";
import type { Item } from "@/types/Item";
import { fetchItemsByList } from "@/services/items/fetchItemsByList";

interface ItemsStore {
  itemsByListId: Record<number, Item[]>; 
  setItemsForList: (listId: number, items: Item[]) => void;
  fetchItemsByListId: (listId: number, token: string) => Promise<void>;
  resetItems: () => void;
}

export const useItemsStore = create<ItemsStore>((set, get) => ({
  itemsByListId: {},

  setItemsForList: (listId, items) => {
    set((state) => ({
      itemsByListId: {
        ...state.itemsByListId,
        [listId]: items,
      },
    }));
  },

  fetchItemsByListId: async (listId, token) => {
    const existing = get().itemsByListId[listId];
    if (existing) return; 

    try {
      const items = await fetchItemsByList(listId, token);
      get().setItemsForList(listId, items);
    } catch (error) {
      console.error(`Erreur lors du fetch des items pour la liste ${listId}`, error);
      throw error;
    }
  },

  resetItems: () => set({ itemsByListId: {} }),
}));

