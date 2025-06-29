import type { AccessList } from "@/types/List";
import { URL_API } from "@/utils/env";

// listes partagées avec l'utilisateur connecté
export async function fetchAccessLists(token: string): Promise<AccessList[]> {
  // console.log("fetchAccessLists called with token du crud:", token);
  const response = await fetch(`${URL_API}/api_lists/getAccessLists`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.log("fetchAccessLists response not ok:", response);
    throw new Error("Erreur lors de la récupération des listes partagées.");
  }

  const data = await response.json();
  // console.log("fetchaccessLists response data:", data);



  return data;
}
