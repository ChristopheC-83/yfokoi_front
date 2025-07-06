import { useAuthStore } from "@/stores/users/useAuthStore";
import { useListsStore } from "@/stores/lists/useListsStore";
import { URL_API } from "@/utils/env";
import { jwtDecode } from "jwt-decode";

// Interface du contenu du token
interface JwtPayload {
  exp: number;
  name: string;
  id: string;
  email?: string;
  // Ajoute ici d'autres champs côté back si nécessaire
}

// Décoder le token et vérifier son expiration
export function decodeToken(token: string): {
  expired: boolean;
  decoded: JwtPayload | null;
} {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000);

    const expired = !decoded.exp || decoded.exp < now;
    return { expired, decoded: expired ? null : decoded };
  } catch (error) {
    console.error("Erreur lors du décodage du token:", error);
    return { expired: true, decoded: null };
  }
}

// Vérifie si l'utilisateur est authentifié
export function isAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  return !!token && !decodeToken(token).expired;
}

// Vérifie si le token expire bientôt (ex: dans 20 min)
export function shouldRefreshToken(
  token: string,
  marginInSeconds = 1200
): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000);
    return !!decoded.exp && decoded.exp - now < marginInSeconds;
  } catch (error) {
    console.error("Erreur lors du décodage du token:", error);
    return false;
  }
}

// Demande un nouveau token au backend
export async function refreshToken(): Promise<string | null> {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await fetch(
      `${URL_API}/api_account/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Échec du rafraîchissement du token");

    const data = await response.json();
    if (!data.token) throw new Error("Pas de token reçu");

    localStorage.setItem("token", data.token);
    return data.token;
  } catch (err) {
    console.error("Erreur lors du rafraîchissement du token :", err);
    return null;
  }
}

// Rafraîchit le token uniquement s'il est proche de l'expiration
export async function refreshTokenIfNeeded(
  marginInSeconds = 1200
): Promise<string | null> {
  const token = localStorage.getItem("token");
  if (!token) return null;

  if (shouldRefreshToken(token, marginInSeconds)) {
    return await refreshToken();
  }

  return token;
}

// Supprime le token local (déconnexion)
export function logout(): void {
  localStorage.removeItem("token");
  useAuthStore.getState().setUser(null);
  useAuthStore.getState().setToken(null);
  useListsStore.getState().resetLists();
  
}
