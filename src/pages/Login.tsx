import { useState } from "react";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const url = "http://localhost/YOFOKOI/yfokoi_back/api_account/login";

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //  A voir plus tard si on utilise des cookies de session PHP
        // credentials: "include", // important si tu utilises des cookies de session PHP
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la connexion");
      }

      // stocker les infos utiles si besoin (token, user, etc.)
      console.log("Connexion réussie", data);
      // rediriger ou rafraîchir les données protégées
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Erreur : "+err.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }
    }
  }

  return (
    <form onSubmit={handleLogin} className="w-full max-w-96 mx-auto p-4">
      <div className="mb-5">
          <label htmlFor="name" className="block mb-3 font-medium text-amber-100">
            Pseudo
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
        </div>
      <div className="mb-5">
          <label htmlFor="password" className="block mb-3 font-medium text-amber-100">
            Mot de Passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
        </div>
      
      <button type="submit" className="bg-slate-900 text-white p-2 w-full rounded-lg hover:bg-slate-700 duration-300 cursor-pointer border-2 border-slate-950 mt-5">
        Connexion
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
