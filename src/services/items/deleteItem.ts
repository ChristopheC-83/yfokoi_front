import { useAuthStore } from "@/stores/users/useAuthStore";
import { URL_API } from "@/utils/env";

export async function deleteItemFromApi(itemId: number): Promise<boolean> {
  if (!itemId) {
    throw new Error("Item ID is required");
  }

  try {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${URL_API}/api_items/deleteItem`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: itemId }),
    });
    const data = await response.json();
    // console.log("Response from API:", data);

    if (!response.ok) {
    //   const data = await response.json();
    //   console.error("API error:", data.message);
      throw new Error("Error deleting the item");
      throw new Error(data.message || "Error deleting the item");
    }
    // console.log("Item deleted successfully:", itemId);
    return true;
  } catch (error) {
    console.error("Error deleting item from API:", error);
    throw error;
  }
}
