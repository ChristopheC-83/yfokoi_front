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
  const setOwnedLists = useListsStore((state) => state.setOwnedLists);
  const setAccessLists = useListsStore((state) => state.setAccessLists);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLists = async () => {
      const token = useAuthStore.getState().token;
      if (!token) {
        setError("Token non trouvé, veuillez vous reconnecter");
        return;
      }

      try {
        const owned = await fetchOwnedLists(token);
        setOwnedLists(owned);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des listes");
        console.error(err);
      }
    };

    fetchLists();
  }, []);

  return (
    <div>
      <h1>DesktopLists de {user.name}</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {ownedLists?.map((list, index) => (
        <div key={index} className="p-4 border-b border-gray-300">
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
