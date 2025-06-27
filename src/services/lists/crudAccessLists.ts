import type { AccessList } from "@/types/List";
import { URL_API } from "@/utils/env";

// listes partagées avec l'utilisateur connecté
export async function fetchAccessLists(token: string): Promise<AccessList[]> {
  const response = await fetch(`${URL_API}/api_lists/shared`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des listes partagées.");
  }

  return response.json();
}