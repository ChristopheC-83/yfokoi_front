
import type { OwnedList } from "@/types/List";
import { URL_API } from "@/utils/env";


//  listes personnelles de l'utilisateur connecté
export async function fetchOwnedLists(token: string): Promise<OwnedList[]> {

  const response = await fetch(`${URL_API}/api_lists/getOwnedLists`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.log("fetchOwnedLists response not ok:", response);
    throw new Error("Erreur lors de la récupération des listes personnelles.");
  }

  const data = await response.json();
  console.log("fetchOwnedLists response data:", data);
  return data;
}
