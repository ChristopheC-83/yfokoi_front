import { useItemsStore } from "@/stores/items/useItemsStore";

interface BtnClearCheckedProps {
    currentListId: number ;
    }

export default function BtnClearChecked({currentListId} : BtnClearCheckedProps) {

    function deleteCheckedItems() {

        // suppression du store
        const items = useItemsStore.getState().itemsByListId[currentListId];
        if (!items) return;

        const checkedItems = items.filter(item => item.is_done);
        if (checkedItems.length === 0) return;

        checkedItems.forEach(item => {
            useItemsStore.getState().removeItemFromList(currentListId, item.id);
        });

        //  suppression de la DB

    }


  return (
    <div className={`rounded border border-amber-200  py-3 mb-4 w-[96vw] mx-auto max-w-[800px] flex items-center justify-center  bg-blue-500  hover:bg-blue-600 duration-300 hover:border-amber-300 text-amber-100 hover:text-amber-200`}
        onClick={deleteCheckedItems}
    >
      <p className="text-center">Supprimer les éléments cochés</p>
    </div>
  )
}
