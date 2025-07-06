import { useState } from "react";
import { toast } from "sonner";
import useLogin from "./useLogin";
import { URL_API } from "@/utils/env";

export default function useRegister() {
  const [error, setError] = useState<string | null>(null);
  const { login } = useLogin();

  async function register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<boolean> {
    setError(null);

    if (!name || !email || !password || !passwordConfirmation) {
      setError("Veuillez remplir tous les champs");
      toast.error("Veuillez remplir tous les champs");

      return false;
    }

    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas");
      toast.error("Les mots de passe ne correspondent pas");

      return false;
    }

    try {
      const response = await fetch(
        `${URL_API}/api_account/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error("Erreur lors de l'enregistrement : " + data.message);
        return false;
      }

      login(name, password);
      toast.success("Enregistrement réussi ! ");
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Erreur : " + err.message);
        toast.error("L'enregistrement a échoué : " + err.message);

        return false;
      } else {
        setError("Une erreur inconnue est survenue");
        toast.error(
          "Une erreur inconnue est survenue lors de l'enregistrement"
        );
        return false;
      }
    }
  }

  return { register, error };
}
