import { useAuthStore } from "@/stores/users/useAuthStore";
import type { activListShare, ListShare } from "@/types/ListShare";
import { URL_API } from "@/utils/env";


//  toutes ces fonctions sont à revoir !


const getToken = () => useAuthStore.getState().token;

const fetchSharesWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...(options.headers || {}),
  }; const res = await fetch(url, { ...options, headers });

  if (!res.ok) throw new Error(`Failed request: ${url} – ${res.status}`);
  return res;
};
// fonction pour récupérer tous les partages
export async function fetchAllSharesFromApi(): Promise<activListShare[]> {
  const res = await fetchSharesWithAuth(`${URL_API}/api_shares/getAllShares`, {
      method: "GET",
    });
    const friends = await res.json();
    return friends;
}

// fonction pour créer un partage
export async function createShareFromApi(share: Omit<ListShare, "author_name">): Promise<void> {
  await fetchSharesWithAuth(`${URL_API}/api_shares/createShare`, {
    method: "POST",
    body: JSON.stringify(share),
  });
}

// fonction pour mettre à jour un partage
export async function updateShareFromApi(listId: number, userId: number, access: number): Promise<void> {
  await fetchSharesWithAuth(`${URL_API}/api_shares/updateShare`, {
    method: "PATCH",
    body: JSON.stringify({
      list_id: listId,
      user_id: userId,
      access_level: access,
    }),
  });
}

// fonction pour supprimer un partage
export async function removeShareFromApi(listId: number, userId: number): Promise<void> {
  await fetchSharesWithAuth(`${URL_API}/api_shares/removeShare`, {
    method: "POST",
    body: JSON.stringify({
      list_id: listId,
      user_id: userId,
    }),
  });
}