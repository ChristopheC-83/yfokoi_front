import { useAuthStore } from "@/stores/users/useAuthStore";
import type { Item } from "@/types/Item";
import type { AccessList, OwnedList } from "@/types/List";
import type { Permissions } from "@/types/Permissions";
// import { useEffect } from "react";
import { LuPencil } from "react-icons/lu";
import { LuPencilOff } from "react-icons/lu";

import IsDone from "./ItemComponents/IsDone";
import DeleteItem from "./ItemComponents/DeleteItem";
import { useState } from "react";
import ChangeItem from "./ItemComponents/ChangeItem";

interface UniqueItemsProps {
  item: Item;
  currentList: OwnedList | AccessList | null;
  permissions: Permissions;
}

export default function UniqueItems({
  item,
  // currentList,
  // permissions,
  permissions: {
    // canCreate,
    canCrudOwn,
    canCrudAll,
    canRead,
    isOwner,
  },
}: UniqueItemsProps) {
  const userId = Number(useAuthStore((state) => state.user?.id));

  // useEffect(() => {
  //   if (item) {
  //     console.log("UniqueItems item", item.id);
  //   }
  // }, [item, currentList, permissions]);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <>
      {(canRead || isOwner) && (
        <div
          key={item.id}
          className={`rounded border border-amber-200  p-1 mb-4 w-[96vw] mx-auto max-w-[800px] flex items-center justify-start ${
            item.is_done ? "bg-gray-600" : "bg-slate-700"
          }`}
        >
          <IsDone item={item} />

          {/*  faire un composant   nom <=>  form update content*/}

          {isEditing &&
          (isOwner ||
            canCrudAll ||
            (canCrudOwn && item.created_by === userId)) ? (
            <ChangeItem item={item} />
          ) : (
            <div className="flex items-center justify-start">
              <p
                className={`text-lg font-semibold ${
                  item.is_done ? "line-through text-amber-300" : ""
                }`}
              >
                {item.content}
              </p>
              {userId !== item.created_by && (
                <p className="text-sm ml-1.5 text-slate-400 no-line-through">
                  de {item.author_name}
                </p>
              )}
            </div>
          )}

          {/* ici 2form, 2 composant update name et delete item */}
          <div
            className={`ml-auto flex items-center justify-center gap-x-3 mr-2 `}
          >
            {(isOwner ||
              canCrudAll ||
              (canCrudOwn && item.created_by === userId)) && (
              <div
                className={`text-xl p-2 rounded-md border border-amber-200 duration-300 cursor-pointer ${
                  isEditing
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-slate-900 hover:bg-slate-600"
                }`}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <LuPencilOff /> : <LuPencil />}
              </div>
            )}
            {(isOwner ||
              canCrudAll ||
              (canCrudOwn && item.created_by === userId)) && (
              <DeleteItem itemId={item.id} currentListId={item.id_list} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
