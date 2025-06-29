/* eslint-disable react-hooks/exhaustive-deps */

import { useAuthStore } from "@/Context/useAuthStore";
import { useListsStore } from "@/Context/useListsStore";
import type { User } from "@/types/User";
import { useEffect, useState } from "react";
import DesktopListsItem from "./components/DesktopListsItem";
import { useUserContextStore } from "@/Context/useUserContextStore";

interface DesktopListsProps {
  user: User;
}

export default function DesktopLists({ user }: DesktopListsProps) {
  const selectedListId = useUserContextStore((state) => state.selectedListId);
  const setSelectedListId = useUserContextStore((s) => s.setSelectedListId);

  const ownedLists = useListsStore((state) => state.ownedLists);
  const accessLists = useListsStore((state) => state.accessLists);
  const fetchOwnedListsFromApi = useListsStore(
    (state) => state.fetchOwnedListsFromApi
  );
  const fetchAccessListsFromApi = useListsStore(
    (state) => state.fetchAccessListsFromApi
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const token = useAuthStore.getState().token;

  function changeSelectedListId(id: number) {
    setSelectedListId(id);
  }
  useEffect(() => {
    console.log("selectedListId dans DesktopLists:", selectedListId);
  }, [selectedListId]);

  useEffect(() => {
    console.log(selectedListId, "selectedListId dans DesktopLists");
    const fetchLists = async () => {
      if (!token) {
        setError("Token non trouvé, veuillez vous reconnecter");
        setLoading(false);
        return;
      }

      try {
        await fetchOwnedListsFromApi(token);
        await fetchAccessListsFromApi(token);
      } catch (err) {
        setError("Erreur lors du chargement des listes : " + err);
      } finally {
        setLoading(false);
      }
    };
    if (ownedLists.length === 0 || accessLists.length === 0) {
      setLoading(true);
      fetchLists();
    } else {
      setLoading(false); // déjà en mémoire, donc pas besoin d'attendre
    }
  }, []);

  return (
    <div className="p-3 w-[240px] shrink-0">
      <h1 className="text-center bg-amber-100 text-slate-900 rounded-full px-3 py-2 text-xl font-bold">
        Mes Listes :
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {ownedLists?.map((list) => (
        <DesktopListsItem
          key={`owned-${list.id}`}
          id={list.id}
          name={list.name}
          ownerName={user.name}
          ownedList={true}
          onClick={() => changeSelectedListId(list.id)}
        />
      ))}

      <h1 className="text-center bg-amber-100 text-slate-900 rounded-full px-4 py-3 text-xl font-bold mt-5">
        Listes Accessibles :
      </h1>
      {accessLists?.map((list) => (
        <DesktopListsItem
          key={`access-${list.id}`}
          id={list.id}
          name={list.name}
          ownerName={list.author_name}
          ownedList={false}
          onClick={() => changeSelectedListId(list.id)}
        />
      ))}
    </div>
  );
}
