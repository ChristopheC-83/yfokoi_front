import { URL_API } from "@/utils/env";

interface ApiUserContextResponse {
  favorite_list_id: number | null | undefined;
  user_id: string | number | null | undefined;
  last_update: Date | null | undefined;
  count_ask_friends: number | undefined;
  favoriteListId: number | null | undefined;
  selected_list_id: number | null | undefined;
  userContext: {
    selected_list_id?: number | null;
    favorite_list_id?: number | null;
    count_ask_friends?: number;
    last_update?: string | null;
    user_id?: string | number | null;
  };
}

export async function fetchUserContextFromApi(token: string): Promise<ApiUserContextResponse> {
  const response = await fetch(`${URL_API}/api_account/userContext`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur serveur");
  }

  const data = await response.json();
  console.log("fetchUserContextFromApi response data:", data);

  // Ici, on retourne *directement* userContext côté backend, sans mapping
  return data;
}

