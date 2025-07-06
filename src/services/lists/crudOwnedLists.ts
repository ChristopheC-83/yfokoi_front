
import type { OwnedList } from "@/types/List";
import { URL_API } from "@/utils/env";

export async function fetchOwnedLists(token: string): Promise<OwnedList[]> {

  const response = await fetch(`${URL_API}/api_lists/getOwnedLists`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des listes personnelles.");
  }
  const data = await response.json();
  return data;
}
