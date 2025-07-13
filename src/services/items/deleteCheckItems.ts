import { useAuthStore } from "@/stores/users/useAuthStore";
import { URL_API } from "@/utils/env";

interface DeleteCheckedItemsResponse {
  message: string;
  deletedCount: number;
}

export async function deleteCheckedItemsFromApi(
  id_list: number
): Promise<DeleteCheckedItemsResponse> {
  if (!id_list) {
    throw new Error("List ID is required");
  }

  try {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${URL_API}/api_items/deleteCheckedItems`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_list }),
    });

    const data = await response.json();
    

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de la suppression");
    }

    return {
      message: data.message,
      deletedCount: data.deletedCount,
    };
  } catch (error) {
    console.error("Erreur lors de la suppression des items cochés :", error);
    throw error;
  }
}
