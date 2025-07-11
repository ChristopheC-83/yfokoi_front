import type { Item } from "@/types/Item";
import { URL_API } from "@/utils/env";

export default function sendItemToDB(item: Item): boolean {
  if (!item || !item.content || !item.id_list) {
    console.error("Item is invalid or missing required fields.");
    return false;
  }

  try {
    fetch(`${URL_API}/api_items/addNewItem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    



    return true;
  } catch (error) {
    console.error("Error sending item to DB:", error);
    return false;
  }

}
