import { useAuthStore } from "@/stores/users/useAuthStore";
import type { Item } from "@/types/Item";
import { URL_API } from "@/utils/env";

interface IsDoneProps {
  item: Item;
}

export async function handleIsDoneFromApi({
  item,
}: IsDoneProps): Promise<boolean> {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      console.info("⛔ Pas de token d'authentification !");
      return false;
    }

    const response = await fetch(`${URL_API}/api_items/updateIsDone`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId: item.id }),
    });
    if (!response.ok) {
      const errorBody = await response.text(); // ou response.json() si tu as JSON
      console.error("Erreur côté backend :", response.status, errorBody);
      throw new Error(`Failed with status ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error updating item status:", error);
    return false;
  }
}
