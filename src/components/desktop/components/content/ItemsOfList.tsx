import { useListPermissions } from "@/hooks/lists/useListPermission";
import { useAuthStore } from "@/stores/users/useAuthStore";
import type { Item } from "@/types/Item";
import type { AccessList, OwnedList } from "@/types/List";
import UniqueItems from "./UniqueItems";
import { useState } from "react";

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

  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  return (
    <div>
      {currentItems?.map((item) => (
        <UniqueItems
          key={item.id}
          item={item}
          currentList={currentList}
          permissions={{ canRead, canCreate, canCrudOwn, canCrudAll, isOwner }}
          isEditing={editingItemId === item.id}
          onToggleEdit={() =>
            setEditingItemId((prevId) => (prevId === item.id ? null : item.id))
          }
        />
      ))}
    </div>
  );
}

