import { useAuthStore } from "@/stores/users/useAuthStore";
import { URL_API } from "@/utils/env";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useDeleteAccount() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  async function deleteAccount() {
    setError(null);

    if (!localStorage.getItem("token")) {
      setError("Vous devez être connecté pour supprimer votre compte");
      return;
    }

    try {
      const response = await fetch(
        `${URL_API}/api_account/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Erreur lors de la suppression du compte"
        );
      }

      // Réinitialise le token et l'utilisateur dans Zustand
      setToken(null);
      setUser(null);
      navigate("/login");
      toast.success("Compte supprimé avec succès !");
    } catch (err: unknown) {
      setError((err as Error).message || "Une erreur est survenue");
      toast.error(error);
    }
  }

  return { deleteAccount, error };
}
