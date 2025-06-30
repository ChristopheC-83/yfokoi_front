import { useAuthStore } from "@/Context/useAuthStore";
import { URL_API } from "@/utils/env";

export async function updateSelectedListIdFromApi(
  selectedListId: number | null
): Promise<boolean> {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      console.error("⛔ Pas de token d'authentification !");
      return false;
    }
    if (selectedListId === null) {
      console.warn("Aucune liste sélectionnée, l'ID est null");
      return false;
    }

    const response = await fetch(
      `${URL_API}/api_account/updateSelectedListId`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ selected_list_id: selectedListId }),
      }
    );

    if (!response.ok) {
      let errorMessage =
        "Erreur serveur lors de la mise à jour de la liste sélectionnée";
      try {
        const errorData = await response.json();
        if (errorData?.message) errorMessage = errorData.message;
      } catch (e) {
        console.log("Erreur lors de la récupération du message d'erreur :", e);
        errorMessage =
          "Erreur inconnue lors de la mise à jour de la liste sélectionnée";
      }
      throw new Error(errorMessage);
    }

    console.log("Liste sélectionnée mise à jour avec succès :", selectedListId);

    return true;
  } catch (error) {
    console.error(
      "⛔ Erreur lors de la mise à jour de la liste sélectionnée :",
      error
    );
    throw error;
  }
}

export async function updateFavoriteListIdFromApi(
  favoriteListId: number | null
): Promise<boolean> {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      console.error("⛔ Pas de token d'authentification !");
      return false;
    }
    if (favoriteListId === null) {
      console.warn("Aucune liste sélectionnée, l'ID est null");
      return false;
    }

    const response = await fetch(
      `${URL_API}/api_account/updateFavoriteListId`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ favorite_list_id: favoriteListId }),
      }
    );

    if (!response.ok) {
      let errorMessage =
        "Erreur serveur lors de la mise à jour de la liste sélectionnée";
      try {
        const errorData = await response.json();
        if (errorData?.message) errorMessage = errorData.message;
      } catch (e) {
        console.log("Erreur lors de la récupération du message d'erreur :", e);
        errorMessage =
          "Erreur inconnue lors de la mise à jour de la liste sélectionnée";
      }
      throw new Error(errorMessage);
    }

    console.log("Liste sélectionnée mise à jour avec succès :", favoriteListId);

    return true;
  } catch (error) {
    console.error(
      "⛔ Erreur lors de la mise à jour de la liste sélectionnée :",
      error
    );
    throw error;
  }
}
