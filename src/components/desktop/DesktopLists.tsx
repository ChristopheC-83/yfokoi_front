import { fetchAllLists } from "@/services/lists/fetchAllLists";
import type { List } from "@/types/List";
import type { User } from "@/types/User";
import { useState, useEffect } from "react";

interface DesktopListsProps {
  user: User;
}

export default function DesktopLists({ user }: DesktopListsProps) {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

 async function loadLists() {
  setLoading(true);
  setError(null);

  try {
    const data = await fetchAllLists();
    setLists(data);
  } catch (err) {
    setError("Impossible de charger les listes : " + (err instanceof Error ? err.message : "Erreur inconnue"));
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    loadLists();
  }, []);

  return (
    <div>
      <h1>DesktopLists de {user.name}</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {lists.map((list, index) => (
        <div key={index} className="p-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold">{list.name}</h2>
          <p className="text-gray-600">Liste de : {list.owner_id}</p>
        </div>
      ))}
    </div>
  );
}
