/* eslint-disable @typescript-eslint/no-unused-vars */
import { deleteItemFromApi } from "@/services/items/deleteItem";
import { fetchItemsByList } from "@/services/items/fetchItemsByList";
import { useItemsStore } from "@/stores/items/useItemsStore";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "sonner";

type Props = {
  currentListId: number;
  itemId: number;
};
export default function DeleteItem({ currentListId, itemId }: Props) {
  const removeItemFromList = useItemsStore((state) => state.removeItemFromList);
  const setItemsForList = useItemsStore((state) => state.setItemsForList);

  async function handleDeleteItem(e: React.FormEvent) {
    e.preventDefault();

    // Suppression optimiste
    removeItemFromList(currentListId, itemId);
    toast.success("Élément supprimé !");

    // Puis on essaye la vraie suppression API
    try {
      const success = await deleteItemFromApi(itemId);
      if (!success) throw new Error("Suppression échouée côté serveur");
    } catch (err) {
      toast.error("Erreur lors de la suppression. Rechargement en cours...");

      // Tu peux ici re-fetcher la liste pour rétablir un état fiable
      const refreshedList = await fetchItemsByList(currentListId);
      setItemsForList(currentListId, refreshedList);
    }
  }

  return (
    <div
      className="text-xl p-2 rounded-md border border-amber-200 bg-slate-900 hover:bg-slate-600 duration-300 cursor-trash"
      onClick={handleDeleteItem}
    >
      <FaRegTrashCan />
    </div>
  );
}
