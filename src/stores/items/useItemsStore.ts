import { create } from "zustand";
import type { Item } from "@/types/Item";
import { fetchItemsByList } from "@/services/items/fetchItemsByList";

interface ItemsStore {
  itemsByListId: Record<number, Item[]>;
  setItemsForList: (listId: number, items: Item[]) => void;
  fetchItemsByListId: (listId: number) => Promise<void>;
  resetItems: () => void;
  removeItemFromList: (listId: number, itemId: number) => void;
  replaceItemById: (listId: number, tempId: number, newItem: Item) => void;
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

  fetchItemsByListId: async (listId) => {
    const existing = get().itemsByListId[listId];
    if (existing) return;

    try {
      const items = await fetchItemsByList(listId);
      get().setItemsForList(listId, items);
    } catch (error) {
      console.error(
        `Erreur lors du fetch des items pour la liste ${listId}`,
        error
      );
      throw error;
    }
  },

  resetItems: () => set({ itemsByListId: {} }),

  removeItemFromList: (listId: number, itemId: number) => {
    set((state) => {
      const updatedItems = (state.itemsByListId[listId] || []).filter(
        (item) => item.id !== itemId
      );
      return {
        itemsByListId: {
          ...state.itemsByListId,
          [listId]: updatedItems,
        },
      };
    });
  },

  replaceItemById: (listId: number, tempId: number, newItem: Item) => {
    const numericListId = typeof listId === "string" ? Number(listId) : listId;
    set((state) => {
      const updatedItems = (state.itemsByListId[numericListId] || []).map(
        (item) => (item.id === tempId ? newItem : item)
      );
      return {
        itemsByListId: {
          ...state.itemsByListId,
          [numericListId]: updatedItems,
        },
      };
    });
  },
}));
