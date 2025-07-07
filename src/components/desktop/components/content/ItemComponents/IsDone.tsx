import { handleIsDoneFromApi } from "@/services/items/handleIsDoneFromApi";
import { useItemsStore } from "@/stores/items/useItemsStore";
import type { Item } from "@/types/Item";

interface IsDoneProps {
  item: Item;
}

export default function IsDone({ item }: IsDoneProps) {
  const { setItemsForList } = useItemsStore();

  async function handleIsDone(id: number) {
    const currentItems = useItemsStore.getState().itemsByListId[item.id_list];

    if (!currentItems) return;

    const updatedItems = currentItems.map((i) =>
      i.id === id ? { ...i, is_done: !i.is_done } : i
    );

    setItemsForList(item.id_list, updatedItems);

    if (!await handleIsDoneFromApi({ item })) {
      console.error("Item status update failed");
    }
  }

  return (
    <div
      className="text-2xl p-2 mr-2 cursor-pointer"
      onClick={() => handleIsDone(item.id)}
    >
      {item.is_done ? "✅" : "⏹️"}
    </div>
  );
}
