import { useState } from "react";

export default function useRegister() {
  const [error, setError] = useState<string | null>(null);

  async function register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) {
    setError(null);

    if (!name || !email || !password || !passwordConfirmation) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/YOFOKOI/yfokoi_back/api_account/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Erreur lors de l'enregistrement");

      console.log("Enregistrement réussi :", data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Erreur : " + err.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }
    }
  }

  return { register, error };
}
