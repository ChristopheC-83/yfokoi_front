import type { ListShare } from "@/types/ListShare";


//  toutes ces fonctions sont à revoir !


// fonction pour récupérer tous les partages
export async function fetchShares(): Promise<ListShare[]> {
  return fetch("/api/shares")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch shares");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching shares:", error);
      throw error;
    });
}

// fonction pour créer un partage
export async function createShare(share: Omit<ListShare, "author_name">): Promise<void> {
  const response = await fetch("/api/shares", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(share),
    });
    if (!response.ok) {
        throw new Error("Failed to create share");
    }
}

// fonction pour mettre à jour un partage
export async function updateShare(listId: number, userId: number, access: number): Promise<void> {
  return fetch(`/api/shares/${listId}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ access_level: access }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to update share");
    }
  });
}

// fonction pour supprimer un partage
export async function removeShare(listId: number, userId: number): Promise<void> {
  return fetch(`/api/shares/${listId}/${userId}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to remove share");
    }
  });
}