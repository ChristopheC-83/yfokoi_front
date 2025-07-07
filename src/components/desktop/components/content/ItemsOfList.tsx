import { useListPermissions } from "@/hooks/lists/useListPermission";
import { useAuthStore } from "@/stores/users/useAuthStore";
import type { Item } from "@/types/Item";
import type { AccessList, OwnedList } from "@/types/List";
import { useEffect } from "react";
import UniqueItems from "./UniqueItems";

interface ItemsOfListProps {
  currentList: OwnedList | AccessList | null;
  currentItems: Item[];
}

export default function ItemsOfList({
  currentList,
  currentItems,
}: ItemsOfListProps) {
  const userId = Number(useAuthStore((state) => state.user?.id));
  const { canRead, canCreate, canCrudOwn, canCrudAll, isOwner } =
    useListPermissions(userId, currentList);

  useEffect(() => {
    if (currentItems) {
      // console.log("currentItems", currentItems);
      // console.log("currentList", currentList);
    }
  }, [currentItems, currentList]);

  return (
    <div>
      <p className="text-center">currentList</p>
      {currentList?.name}

      {(isOwner || canRead) && (
        <p className="text-green-500">
          Vous pouvez voir des items dans cette liste
        </p>
      )}
      {(isOwner || canCreate) && (
        <p className="text-green-500">
          Vous pouvez créer des items dans cette liste
        </p>
      )}

      {(isOwner || canCrudOwn) && (
        <p className="text-yellow-500">
          Vous pouvez modifier vos propres items dans cette liste
        </p>
      )}

      {(isOwner || canCrudAll) && (
        <p className="text-red-500">
          Vous pouvez modifier tous les items dans cette liste
        </p>
      )}

      {currentItems?.map((item) => (
        <UniqueItems
        key={item.id}
          item={item}
          currentList={currentList}
          permissions={{ canRead, canCreate, canCrudOwn, canCrudAll, isOwner }}
        />
      ))}
    </div>
  );
}
