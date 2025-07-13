import { useAuthStore } from "@/stores/users/useAuthStore";
import type { Item } from "@/types/Item";
import type { AccessList, OwnedList } from "@/types/List";
import type { Permissions } from "@/types/Permissions";
import { LuPencil } from "react-icons/lu";
import { LuPencilOff } from "react-icons/lu";

import IsDone from "./ItemComponents/IsDone";
import DeleteItem from "./ItemComponents/DeleteItem";
import ChangeItem from "./ItemComponents/ChangeItem";

interface UniqueItemsProps {
  item: Item;
  currentList: OwnedList | AccessList | null;
  permissions: Permissions;
  isEditing: boolean;
  onToggleEdit: () => void;
}

export default function UniqueItems({
  item,
  permissions: {
    canCrudOwn,
    canCrudAll,
    canRead,
    isOwner,
  },
  isEditing,
  onToggleEdit,
}: UniqueItemsProps) {
  const userId = Number(useAuthStore((state) => state.user?.id));

  const canEdit =
    isOwner || canCrudAll || (canCrudOwn && item.created_by === userId);

  return (
    <>
      {(canRead || isOwner) && (
        <div
          key={item.id}
          className={`rounded border border-amber-200 p-1 mb-4 w-[96vw] mx-auto max-w-[800px] flex items-center justify-start ${
            item.is_done ? "bg-gray-600" : "bg-slate-700"
          }`}
        >
          <IsDone item={item} />

          {/* Bloc nom ou formulaire de modification */}
          {isEditing && canEdit ? (
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

          {/* Boutons modifier / supprimer */}
          <div className="ml-auto flex items-center justify-center gap-x-3 mr-2">
            {canEdit && (
              <div
                className={`text-xl p-2 rounded-md border border-amber-200 duration-300 cursor-pointer ${
                  isEditing
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-slate-900 hover:bg-slate-600"
                }`}
                onClick={onToggleEdit}
              >
                {isEditing ? <LuPencilOff /> : <LuPencil />}
              </div>
            )}

            {canEdit && (
              <DeleteItem itemId={item.id} currentListId={item.id_list} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
