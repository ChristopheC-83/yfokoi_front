import { useEffect, useState } from "react";
import { useItemsStore } from "@/stores/items/useItemsStore";
import { useUserContextStore } from "@/stores/users/useUserContextStore";
import { useAuthStore } from "@/stores/users/useAuthStore";

export function useInitSelectedItems() {
  const selectedListId = useUserContextStore((state) => state.selectedListId);
  const fetchItemsByListId = useItemsStore((state) => state.fetchItemsByListId);
  const token = useAuthStore((state) => state.token);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedListId || !token) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        await fetchItemsByListId(selectedListId, token);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des items de la liste sélectionnée.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedListId, token, fetchItemsByListId]);

  return { loading, error };
}
