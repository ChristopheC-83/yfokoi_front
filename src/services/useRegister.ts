import { useState } from "react";
import { toast } from "sonner";

export default function useRegister() {
  const [error, setError] = useState<string | null>(null);

  async function register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<boolean> {
    setError(null);

    if (!name || !email || !password || !passwordConfirmation) {
      setError("Veuillez remplir tous les champs");
      console.log("name : ", name);
      console.log("email : ", email);
      console.log("password : ", password);
      console.log("passwordConfirmation : ", passwordConfirmation);
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

      if (!response.ok) {
        toast.error("Erreur lors de l'enregistrement : " + data.message);
        return false;
      }

      console.log("Enregistrement réussi :", data);
      toast.success("Enregistrement réussi ! Vous êtes connecté !");
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
