import type { Item } from "@/types/Item";
import { URL_API } from "@/utils/env";

export default async function sendItemToDB(item: Item): Promise<boolean> {
  if (!item || !item.content || !item.id_list) {
    throw new Error("Item invalide ou champs manquants");
  }

  try {
    const response = await fetch(`${URL_API}/api_items/addNewItem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();

    if (!response.ok) {
      console.error("Réponse de l'API error:", data.message);
      throw new Error(data.message || "Erreur lors de la création de l'item");
    }

    // console.log("Réponse de l'API:", data);
    // if (data.message) {
    //   console.log("Message from API:", data.message);
    // }

    // 🔎 Ici tu t’assures que `data` est bien un Item avec ID réel
    return true;
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'item à la base de données :",
      error
    );
    throw error;
  }
}
