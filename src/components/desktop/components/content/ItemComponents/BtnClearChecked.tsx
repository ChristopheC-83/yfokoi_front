/* eslint-disable @typescript-eslint/no-unused-vars */
import { deleteCheckedItemsFromApi } from "@/services/items/deleteCheckItems";
import { fetchItemsByList } from "@/services/items/fetchItemsByList";
import { useItemsStore } from "@/stores/items/useItemsStore";
import { useAuthStore } from "@/stores/users/useAuthStore";
import { toast } from "sonner";

interface BtnClearCheckedProps {
  currentListId: number;
  allRights: boolean;
}

export default function BtnClearChecked({
  currentListId,
  allRights,
}: BtnClearCheckedProps) {
  const { setItemsForList } = useItemsStore.getState();

  const userId = Number(useAuthStore((state) => state.user?.id));
  // const [checkedItems, setCheckedItems] = useState<Item[]>([]);
  const items = useItemsStore.getState().itemsByListId[currentListId];


  async function deleteCheckedItems() {
    
    if (!items) return;

    const checked = allRights
    ? items.filter((item) => item.is_done)
    : items.filter((item) => item.is_done && item.created_by === userId);

  if (checked.length === 0) return;

    checked.forEach((item, i) => {
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
      <p className="text-center">Supprimer {allRights ? "TOUS les" : "MES"} éléments cochés</p>
    </div>
  );
}
