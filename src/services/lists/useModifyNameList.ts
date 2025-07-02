import { useAuthStore } from "@/Context/useAuthStore";
import { URL_API } from "@/utils/env";
import { useState } from "react";
import type { AccessList, OwnedList } from "@/types/List";
import { useListsStore } from "@/Context/useListsStore";

interface ChangeListNameFormProps {
  currentList: OwnedList | AccessList;
}

export default function useModifyNameList() {
  const { ownedLists } = useListsStore();
  const [error, setError] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  async function modifyNameList(
    { currentList }: ChangeListNameFormProps,
    newNameList: string
  ) {
    setError(null);

    if (!token) {
      setError("Vous devez être connecté pour modifier le nom de la liste");
      return;
    }

    if (!user) {
      setError("Utilisateur non trouvé");
      return;
    }

    if (currentList.owner_id !== user.id) {
      setError("Vous n'êtes pas autorisé à modifier le nom de cette liste");
      return;
    }

    const isNameUsed = ownedLists.some(
      (list) => list.name === newNameList.trim() && list.id !== currentList.id
    );

    if (isNameUsed) {
      setError("Ce nom de liste est déjà utilisé");
      return;
    }

    if (!newNameList.trim()) {
      setError("Veuillez entrer un nouveau nom pour la liste");
      return;
    }

    try {
      const response = await fetch(`${URL_API}/api_lists/modifyNameList`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newNameList }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la modification du nom de la liste");
      }

      const data = await response.json();
      console.log("modifyNameList response data:", data);

      // Redirection ou mise à jour de l'état si nécessaire
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Erreur : " + err.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }
    }
  }

  return { modifyNameList, error };
}
