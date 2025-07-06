/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuthStore } from "@/stores/users/useAuthStore";
import type { Item } from "@/types/Item";
import type { AccessList, OwnedList } from "@/types/List";
import type { Permissions } from "@/types/Permissions";
import { useEffect } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";



interface UniqueItemsProps {
  item: Item;
  currentList: OwnedList | AccessList | null;
  permissions: Permissions;
}

export default function UniqueItems({
  item,
  currentList,
  permissions,
  permissions: { canCreate, canCrudOwn, canCrudAll, canRead, isOwner },
}: UniqueItemsProps) {
  const userId = Number(useAuthStore((state) => state.user?.id));

  useEffect(() => {
    if (item) {
      console.log("UniqueItems item", item);
      console.log("currentList", currentList);
      console.log("permissions", permissions);
    }
  }, [item, currentList, permissions]);

  return (
    <>
      {(canRead || isOwner) && (
        <div
          key={item.id}
          className="rounded border border-amber-200 bg-slate-700 p-1 mb-4 w-[96vw] mx-auto max-w-[800px] flex items-center justify-start"
        >
          {/*  faire un composant form pour isDone */}
          <div className="text-2xl p-2 mr-2">{item.is_done ? "✅" : "⏹️"}</div>

          {/*  faire un composant   nom <=>  form update content*/}

          <div className="flex items-centerjustify-start">
            <p className="text-lg font-semibold">{item.content}</p>
          </div>
          {/* ici 2form, 2 composant update name et delete item */}

          <div className="ml-auto flex items-center justify-center gap-x-3 mr-2">
            <div className="text-xl p-2 rounded-md border border-amber-200 bg-slate-900 hover:bg-slate-600 duration-300 cursor-pointer"><FaPencil/></div>
            <div className="text-xl p-2 rounded-md border border-amber-200 bg-slate-900 hover:bg-slate-600 duration-300 cursor-pointer"><FaRegTrashCan/></div>
          </div>
        </div>
      )}
    </>
  );
}

{
  /* // <div key={item.id}>
//   <p>
//     {item.id} - {item.content} de {item.created_by}
//   </p>
//   <p>{item.created_by}</p>
//   <p>{item.is_done}</p>
//   <p>
//     {item.created_at instanceof Date
//       ? item.created_at.toLocaleString()
//       : item.created_at}
//   </p>
//   <hr />
// </div> */
}
