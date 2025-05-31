import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  iat?: number;
  userId?: string;
  email?: string;
  // ajoute ici les champs que tu inclus côté backend
}

export const decodeToken = (token: string) => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000);

    if (typeof decoded.exp !== "number" || decoded.exp < now) {
      return { expired: true, decoded: null };
    } else {
      return { expired: false, decoded };
    }
  } catch (error) {
    console.error("Erreur lors du décodage du token:", error);
    return { expired: true, decoded: null };
  }
};
