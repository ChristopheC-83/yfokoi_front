import { useAuthStore } from "@/Context/useAuthStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "./authServices";
import { toast } from "sonner";

export default function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  async function login(name: string, password: string) {
    setError(null);

    if (!name || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/YOFOKOI/yfokoi_back/api_account/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, password }),
        }
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Erreur lors de la connexion");
      if (!data.token) throw new Error("Le token n'a pas été reçu");

      // stocke token et user dans Zustand
      setToken(data.token);

      const { expired, decoded } = decodeToken(data.token);

      if (expired || !decoded) {
        throw new Error("Token expiré ou invalide");
      }
      setUser({
        id: decoded.id || "",
        name: decoded.name || "",
        email: decoded.email || "", 
      });
      navigate("/");
      toast.success("Connexion réussie !");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Erreur : " + err.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }
    }
  }

  return { login, error };
}
