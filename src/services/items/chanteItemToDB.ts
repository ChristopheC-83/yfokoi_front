import { useAuthStore } from "@/stores/users/useAuthStore";
import { URL_API } from "@/utils/env";
import { toast } from "sonner";


export default async function ChangeItemToDB(itemId: number, newContent: string): Promise<boolean> {
  if (!itemId || !newContent) {
    throw new Error("ID de l'item ou nouveau contenu manquant");
  }

  try {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${URL_API}/api_items/changeContentItem`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId: itemId, content: newContent }),
    });
    const data = await response.json();

    if (!response.ok) {
    //   console.error("Réponse de l'API error:", data.message);
      toast.error(data.message || "Erreur lors de la modification de l'item");
      throw new Error(data.message || "Erreur lors de la modification de l'item");
    }

    return true;


  } catch (error) {
    console.error(
      "Erreur lors de la modification de l'item dans la base de données :",
      error
    );
    throw error;
  }
}