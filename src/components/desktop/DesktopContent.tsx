/* eslint-disable react-hooks/exhaustive-deps */
import { useListsStore } from "@/Context/useListsStore";
import { useUserContextStore } from "@/Context/useUserContextStore";
import type { AccessList, OwnedList } from "@/types/List";
import type { User } from "@/types/User";
import { useEffect, useState } from "react";
import ChangeListNameForm from "./components/ChangeListNameForm";
import { useInitSelectedItems } from "@/hooks/items/useInitItems";
import { useItemsStore } from "@/Context/useItemsStore";
import ItemsOfList from "./components/listContent/ItemsOfList";

interface DesktopContentProps {
  user: User;
}

export default function DesktopContent({ user }: DesktopContentProps) {
  const selectedListId = useUserContextStore((state) => state.selectedListId);

  const { ownedLists, accessLists } = useListsStore();
  const [currentList, setCurrentList] = useState<OwnedList | AccessList | null>(
    null
  );
  const [changeListName, setChangeListName] = useState<boolean>(false);
  const { loading, error } = useInitSelectedItems();

  const currentItems = useItemsStore((state) => state.itemsByListId[selectedListId as number] );



  useEffect(() => {
    setCurrentList(
      ownedLists.find((list) => list.id === selectedListId) ||
        accessLists.find((list) => list.id === selectedListId) ||
        null
    );
    console.log("currentList:", currentList);
  }, [selectedListId, ownedLists, accessLists]);

    useEffect(() => {
  console.log("🧪 currentItems:", currentItems);
}, [currentItems]);

  // On retire le formulaire si on change de liste
  useEffect(() => {
    setChangeListName(false);
  }, [currentList]);

  //  le formulaire se retire si modification de nom, on envoie cette fonction dans le composant ChangeListNameForm
  function onCloseForm() {
    setTimeout(() => {
      setChangeListName(false);
    }, 500);
  }



  if (selectedListId === undefined || selectedListId === null) {
    return (
      <div className="p-4 text-amber-100 grow text-center">
        <h2 className="text-2xl font-bold text-amber-100 my-5">
          Bienvenue, {user.name} !
        </h2>
        {ownedLists.length === 0 && accessLists.length === 0 ? (
          <p className="">
            Tu n'as pas encore de listes. Crée-en une pour commencer !
          </p>
        ) : (
          <p className="text-xl mt-3">
            Sélectionne une liste à partager pour commencer !
          </p>
        )}
      </div>
    );
  }
  if (currentList) {
    return (
      <div className="p-4 text-amber-100 grow text-center">
        <h2 className="text-2xl font-bold text-amber-100 my-5">
          Bienvenue, {user.name} !
        </h2>
        <div className="flex gap-3 justify-center my-3">
          {currentList.name}
          <span
            onClick={() => setChangeListName(!changeListName)}
            className={`cursor-pointer  ${
              currentList.owner_id !== user.id ? "hidden" : ""
            }`}
          >
            {changeListName ? "❌" : "✏️"}
          </span>
        </div>
        <div
          className={`duration-700 opacity-100 transition-all ease-in-out ${
            !changeListName && "-translate-x-[100vw] opacity-[0]"
          }  ${currentList.owner_id !== user.id ? "hidden" : ""}`}
        >
          <ChangeListNameForm
            currentList={currentList}
            onCloseForm={() => onCloseForm()}
          />
        </div>
        <div>
          {loading && <p className="text-slate-600 italic">Chargement...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error ? (
            <ItemsOfList
              currentList={currentList}
              currentItems={currentItems}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
