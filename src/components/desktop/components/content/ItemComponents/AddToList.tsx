/* eslint-disable @typescript-eslint/no-unused-vars */
import { useListPermissions } from "@/hooks/lists/useListPermission";
import { useItemsStore } from "@/stores/items/useItemsStore";
import { useAuthStore } from "@/stores/users/useAuthStore";
import type { Item } from "@/types/Item";
import type { AccessList, OwnedList } from "@/types/List";
import { useEffect, useState } from "react";

interface AddToListProps {
  currentList: OwnedList | AccessList;
}

export default function AddToList({ currentList }: AddToListProps) {
  const { itemsByListId, setItemsForList } = useItemsStore();
  const user = useAuthStore((state) => state.user);
  const userId = Number(useAuthStore((state) => state.user?.id));

  const [newItem, setNewItem] = useState<string>("");

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newItem.trim()) return;

    const tempId = Date.now(); // ID temporaire
    const optimisticItem: Item = {
      id: tempId,
      content: newItem, 
      is_done: false,
      id_list: currentList.id,
      created_at: new Date(),
      created_by: userId,
      author_name: user?.name ?? "Moi",
      author_email: user?.email ?? "inconnu@yolo.com",
    };
    console.log("Adding item:", newItem);
    setItemsForList(currentList.id, [
      ...(itemsByListId[currentList.id] || []),
      optimisticItem,
    ]);

    setNewItem(""); // Clear the input after adding
  }

  useEffect(() => {
    if (currentList) {
      const currentItems = itemsByListId[currentList.id] || [];
      console.log("Current items for list:", currentItems);
    }
  }, [currentList, itemsByListId]);

  return (
    <form
      className="w-[96vw] mx-auto max-w-[800px] flex justify-between items-center my-2 gap-x-3"
      onSubmit={handleAddItem}
    >
      <input
        type="text"
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-md rounded block  w-full p-2 `}
        value={newItem}
        placeholder="Ajouter un nouvel élément à la liste"
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button type="submit" className="text-4xl mb-1 p-2 pr-0 cursor-pointer">
        ✅
      </button>
    </form>
  );
}
