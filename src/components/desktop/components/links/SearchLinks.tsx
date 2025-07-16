import { nameSearchedInDb } from "@/services/links/searchLinks";
import { useState } from "react";

type NameResult = { id: number; name: string }[];

export default function SearchLinks() {
  const [nameSearched, setNameSearched] = useState("");
  const [namesResult, setNamesResult] = useState<NameResult>([]);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearchName(e: React.FormEvent) {
    e.preventDefault();
    if (!nameSearched.trim()) return;

    const result = await nameSearchedInDb(nameSearched);
    setNamesResult(result);
    setHasSearched(true);
    setNameSearched("");
  }

  return (
    <div>
      <h2 className="mt-4 mb-2">Rechercher</h2>

      <form onSubmit={handleSearchName} className="flex justify-center gap-x-2">
        <input
          type="text"
          className="border border-amber-200 rounded px-2 py-1 bg-slate-800 w-full"
          placeholder="Rechercher un utilisateur"
          onChange={(e) => setNameSearched(e.target.value)}
          value={nameSearched}
        />
        <button type="submit" className="cursor-pointer text-3xl">
          ✅
        </button>
      </form>

      {hasSearched && (
        <div className="mt-4">
          {namesResult.length > 0 ? (
            <>
              <h3>Résultats de la recherche :</h3>
              <ul className="list-disc pl-5">
                {namesResult.map((result) => (
                  <li key={result.id}>{result.name}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>Aucun résultat trouvé.</p>
          )}
        </div>
      )}
    </div>
  );
}
