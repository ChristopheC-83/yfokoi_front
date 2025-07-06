import type { Item } from "@/types/Item";
import { URL_API } from "@/utils/env";

export async function fetchItemsByList(
  idList: number,
  token: string
): Promise<Item[]> {
  const res = await fetch(`${URL_API}/api_items/getItemsByList`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ idList }),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des items de la liste");
  }

  const data: Item[] = await res.json();
  return data;
}
