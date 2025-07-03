import { URL_API } from "@/utils/env";
import { useItemsStore } from "@/Context/items/listsItemsStore";
import type { ItemBlock } from "@/Context/items/listsItemsStore";
import type { ItemList } from "@/types/Item";

export async function fetchAllItemsByUser(token: string): Promise<void> {
  const response = await fetch(`${URL_API}/api_items/getAllMyItems`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des items");
  }

  const itemsData: ItemList[] = await response.json();
  console.log("Items chargés :", itemsData);

  // Grouper les items par list_id pour correspondre à ItemBlock[]
  const groupedItems: Record<number, ItemList[]> = {};

  itemsData.forEach((item) => {
    const listId = item.id_list;
    if (!groupedItems[listId]) groupedItems[listId] = [];
    groupedItems[listId].push(item);
  });

  const itemBlocks: ItemBlock[] = Object.entries(groupedItems).map(([id, items]) => ({
    id: Number(id),
    items,
  }));

  // Mise à jour du store
  const setAllItems = useItemsStore.getState().setAllItems;
  setAllItems(itemBlocks);
}

