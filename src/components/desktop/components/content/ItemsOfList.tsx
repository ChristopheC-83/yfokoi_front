import { useItemsStore } from "@/stores/items/useItemsStore";
import type { Item } from "@/types/Item";
import type { AccessList, OwnedList } from "@/types/List";

interface ItemsOfListProps {
  currentList: OwnedList | AccessList | null;
  currentItems: Item[]; 
}
export default function ItemsOfList({
  currentList,
  currentItems,
}: ItemsOfListProps) {

  const setItemsForList = useItemsStore((state) => state.setItemsForList);
  console.log("🧪 setItemsForList:", setItemsForList) ;

  return (
    <div>
      <p className="text-center">currentList</p>
      {currentList && currentList.name}
      {currentItems?.map((item) => (
        <div>
          <p key={item.id}>{item.id} - {item.content} de {item.created_by}</p>
          <p>{item.created_by}</p>
          <p>{item.is_done}</p>
          <p>{item.created_at instanceof Date ? item.created_at.toLocaleString() : item.created_at}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
