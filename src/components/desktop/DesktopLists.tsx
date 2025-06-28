/* eslint-disable react-hooks/exhaustive-deps */

import { useAuthStore } from "@/Context/useAuthStore";
import { fetchOwnedLists } from "@/services/lists/crudOwnedLists";
import { useListsStore } from "@/stores/useListsStore";
import type { User } from "@/types/User";
import { useEffect, useState } from "react";

interface DesktopListsProps {
  user: User;
}

export default function DesktopLists({ user }: DesktopListsProps) {

  const ownedLists = useListsStore((state) => state.ownedLists);
  const accessLists = useListsStore((state) => state.accessLists);
  const fetchOwnedListsFromApi = useListsStore((state) => state.fetchOwnedListsFromApi);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const token = useAuthStore.getState().token;

  useEffect(() => {
    const fetchLists = async () => {
      if (!token) {
        setError("Token non trouvé, veuillez vous reconnecter");
        setLoading(false);
        return;
      }

      try {
        await fetchOwnedListsFromApi(token);
      } catch (err) {
        setError("Erreur lors du chargement des listes : " + err);
      } finally {
        setLoading(false);
      }
    };

    if (ownedLists.length === 0) {
      setLoading(true);
      fetchLists();
    } else {
      setLoading(false); // déjà en mémoire, donc pas besoin d'attendre
    }
  }, []);

  return (
    <div>
      <h1>DesktopLists de {user.name}</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {ownedLists?.map((list) => (
        <div key={list.id} className="p-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold">{list.name}</h2>
          <p className="text-gray-600">Liste de : {list.owner_id}</p>
        </div>
      ))}
      {accessLists?.map((list, index) => (
        <div key={index} className="p-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold">{list.name}</h2>
          <p className="text-gray-600">Liste de : {list.owner_id}</p>
        </div>
      ))}
    </div>
  );
}
