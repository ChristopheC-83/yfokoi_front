import { useAuthStore } from "@/stores/users/useAuthStore";
import { URL_API } from "@/utils/env";
import { toast } from "sonner";

export async function nameSearchedInDb(
  searchName: string
): Promise<{ id: number; name: string }[]> {
  if (!searchName) {
    toast.error("Le nom recherché est ne peut pas être vide");
    throw new Error("Le nom recherché est ne peut pas être vide");
  }

  try {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${URL_API}/api_links/nameSearchedInDb`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ searchName: searchName }),
    });
    const data = await response.json();

    if (!response.ok) {
      //   console.error("Réponse de l'API error:", data.message);
      toast.error(data.message || "Erreur lors de la récupération des noms");
      throw new Error(
        data.message || "Erreur lors de la récupération des noms"
      );
    }
    // console.log("data", data);
    const results = data.map(
      (item: { id: number; name: string; avatar: string }) => ({
        id: item.id,
        name: item.name,
        avatar: item.avatar || "",
      })
    );

    // console.log("Résultats de la recherche:", results);

    return results;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des noms dans la base de données :",
      error
    );
    throw error;
  }
}
