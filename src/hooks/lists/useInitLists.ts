// hooks/useInitLists.ts
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/users/useAuthStore";
import { useListsStore } from "@/stores/lists/useListsStore";

export function useInitLists() {
  const {
    ownedLists,
    accessLists,
    fetchOwnedListsFromApi,
    fetchAccessListsFromApi,
  } = useListsStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = useAuthStore.getState().token;
    if (!token) {
      setError("Token non trouvé, veuillez vous reconnecter");
      return;
    }

    const fetchLists = async () => {
      try {
        setLoading(true);
        await Promise.all([
          fetchOwnedListsFromApi(token),
          fetchAccessListsFromApi(token),
        ]);
      } catch (err) {
        setError("Erreur lors du chargement des listes : " + String(err));
      } finally {
        setLoading(false);
      }
    };

    if (ownedLists.length === 0 || accessLists.length === 0) {
      fetchLists();
    }
  }, []);

  return { loading, error };
}
