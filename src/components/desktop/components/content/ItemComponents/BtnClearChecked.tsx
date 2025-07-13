/* eslint-disable @typescript-eslint/no-unused-vars */
import { deleteCheckedItemsFromApi } from "@/services/items/deleteCheckItems";
import { fetchItemsByList } from "@/services/items/fetchItemsByList";
import { useItemsStore } from "@/stores/items/useItemsStore";
import { toast } from "sonner";

interface BtnClearCheckedProps {
  currentListId: number;
}

export default function BtnClearChecked({
  currentListId,
}: BtnClearCheckedProps) {
  const { setItemsForList } = useItemsStore.getState();

  async function deleteCheckedItems() {
    // suppression du store
    const items = useItemsStore.getState().itemsByListId[currentListId];
    if (!items) return;

    const checkedItems = items.filter((item) => item.is_done);
    if (checkedItems.length === 0) return;

    checkedItems.forEach((item, i) => {
      setTimeout(() => {
        useItemsStore.getState().removeItemFromList(currentListId, item.id);
      }, i * 150); // ✅ décalage progressif
    });

    //  suppression de la DB
    try {
      const result = await deleteCheckedItemsFromApi(currentListId);

      toast.success(`${result.deletedCount} élément(s) supprimé(s) !`);
    } catch (err) {
      toast.error("Erreur lors de la suppression. Rechargement...");
      const refreshed = await fetchItemsByList(currentListId);
      setItemsForList(currentListId, refreshed);
    }
  }

  return (
    <div
      className={`rounded border border-amber-200  py-3 mb-4 w-[96vw] mx-auto max-w-[800px] flex items-center justify-center  bg-blue-500  hover:bg-blue-600 duration-300 hover:border-amber-300 text-amber-100 hover:text-amber-200`}
      onClick={deleteCheckedItems}
    >
      <p className="text-center">Supprimer les éléments cochés</p>
    </div>
  );
}
