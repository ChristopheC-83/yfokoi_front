import type { Item } from "@/types/Item";
import type { AccessList, OwnedList } from "@/types/List";
// import { useEffect } from "react";

interface ItemsOfListProps {
  currentList: OwnedList | AccessList | null;
  currentItems: Item[]; // Assuming Item is defined elsewhere
}
export default function ItemsOfList({
  currentList,
  currentItems,
}: ItemsOfListProps) {

// useEffect(() => {
//   console.log("ItemsOfList currentList:", currentList);
//     console.log("ItemsOfList currentItems:", currentItems);
// }, [currentList, currentItems]);

  return (
    <div>
      <p className="text-center">currentList</p>
      {currentList && currentList.name}
      {currentItems?.map((item) => (
        <p key={item.id}>{item.content}</p>
      ))}
    </div>
  );
}
