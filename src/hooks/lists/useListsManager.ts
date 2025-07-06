import { useAuthStore } from "@/stores/users/useAuthStore";
import { useListsStore } from "@/stores/lists/useListsStore";
import { URL_API } from "@/utils/env";
import { useState } from "react";
import { toast } from "sonner";

export default function useListsManager() {
  const [error, setError] = useState<string | null>(null);
  const { ownedLists, setOwnedLists } = useListsStore();

  async function createNewList(name: string) {
    setError(null);

    const trimmedName = name.trim();

    if (!trimmedName) {
      const msg = "Veuillez donner un nom à la liste";
      setError(msg);
      toast.error(msg);
      return false;
    }

    if (ownedLists.some((list) => list.name === trimmedName)) {
      const msg = "Une liste avec ce nom existe déjà";
      setError(msg);
      toast.error(msg);
      return false;
    }

    try {
      const token = useAuthStore.getState().token;
      if (!token) {
        const msg = "⛔ Pas de token d'authentification !";
        console.error(msg);
        toast.error(msg);
        return false;
      }

      const response = await fetch(`${URL_API}/api_lists/createNewList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: trimmedName }),
      });

      const data = await response.json();

      if (!response.ok) {
        // console.log(data);
        // console.log(response);
        throw new Error(data.message || "Erreur lors de la création");
      }
      // console.log("coucou");
      // console.log(data);
      // console.log(response);

      setOwnedLists([...ownedLists, data.newList]);
      toast.success("Liste créée avec succès !");
      // console.log("Liste créée avec succès :", data.newList);
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erreur inconnue";
      setError(message);
      toast.error(message);
      console.error("⛔ Erreur lors de la création de la liste :", error);
      return false;
    }
  }

  async function deleteList(id: number) {
    setError(null);


    if (!id) {
      const msg = "Veuillez fournir un ID valide pour la liste";
      setError(msg);
      toast.error(msg);
      return false;
    }

    try {
      const token = useAuthStore.getState().token;
      if (!token) {
        const msg = "⛔ Pas de token d'authentification !";
        console.error(msg);
        toast.error(msg);
        return false;
      }

      const response = await fetch(`${URL_API}/api_lists/deleteList`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: id }),
      });

      const data = await response.json();

      if (!response.ok) {
        // console.log(data);
        // console.log(response);
        throw new Error(data.message || "Erreur lors de la suppression");
      }

      // console.log("au revoir la liste");
      // console.log(data);
      // console.log(response);


      setOwnedLists(ownedLists.filter((list) => list.id !== id));
      toast.success("Liste supprimée avec succès !");
      // console.log("Liste supprimée avec succès :", id);
      return true;



    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erreur inconnue";
      setError(message);
      toast.error(message);
      console.error("⛔ Erreur lors de la création de la liste :", error);
      return false;
    }
  }

  return { createNewList, deleteList, error };
}
