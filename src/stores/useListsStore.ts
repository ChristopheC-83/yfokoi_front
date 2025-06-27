
import type { AccessList, OwnedList } from "@/types/List";
import { create } from "zustand";

interface ListsStore {
  selectedListId: number | null;
  favoriteListId: number | null;
  ownedLists: OwnedList[];
  accessLists: AccessList[];
  setOwnedLists: (lists: OwnedList[]) => void;
  setAccessLists: (lists: AccessList[]) => void;
}


export const useListsStore = create<ListsStore>((set) => ({
  selectedListId: null,
  favoriteListId: null,
  ownedLists: [],
  accessLists: [],
  
  setOwnedLists: (lists) => {
  console.log("setOwnedLists déclenché");
  set({ ownedLists: lists });
},

  setAccessLists: (lists) => set({ accessLists: lists }),
}));