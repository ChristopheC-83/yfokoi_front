/* eslint-disable react-hooks/exhaustive-deps */
import { useListsStore } from "@/Context/useListsStore";
import { useUserContextStore } from "@/Context/useUserContextStore";
import type { AccessList, OwnedList } from "@/types/List";
import type { User } from "@/types/User";
import { useEffect, useState } from "react";

interface DesktopContentProps {
  user: User;
}

export default function DesktopContent({ user }: DesktopContentProps) {
  const selectedListId = useUserContextStore((state) => state.selectedListId);
  const { ownedLists, accessLists } = useListsStore();
  const [currentList, setCurrentList] = useState<OwnedList | AccessList | null>(
    null
  );

  console.log("accessLists:", accessLists);
  console.log("ownedLists:", ownedLists);

  useEffect(() => {
    setCurrentList(
      ownedLists.find((list) => list.id === selectedListId) ||
        accessLists.find((list) => list.id === selectedListId) ||
        null
    );

    console.log("currentList mis à jour :", currentList);
  }, [selectedListId, ownedLists, accessLists]);

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
        {currentList.name}
      </div>
    );
  }
}
