import type { OwnedList } from "@/types/List";
import { URL_API } from "@/utils/env";

export async function fetchAllLists(): Promise<OwnedList[]> {
  const response = await fetch(`${URL_API}/api_lists/getAllLists`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des listes");
  }

  const data = await response.json();
  return data;
}

