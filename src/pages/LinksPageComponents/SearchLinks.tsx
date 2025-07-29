import { nameSearchedInDb } from "@/services/links/searchLinks";
import { useState } from "react";
import OneSearchResult from "./OneSearchResult";

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

  function handleRequestSent(userId: number) {
    setNamesResult((prev) => prev.filter((user) => user.id !== userId));
  }


  function resetSearch() {
    setNamesResult([]);
    setHasSearched(false);
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
              <h3 className="mt-4 mb-2">Résultats de la recherche :</h3>
              {/* <ul className="list-disc pl-5">
                {namesResult.map((result) => (
                  <li key={result.id}>{result.name}</li>
                ))}
              </ul> */}
              <div className="flex flex-col  gap-2">
                {namesResult.map((result) => (
                  <OneSearchResult
                    key={result.id}
                    result={result}
                    onRequestSent={handleRequestSent}
                    resetSearch={resetSearch}
                  />
                ))}
              </div>
            </>
          ) : (
            <p>Aucun résultat trouvé.</p>
          )}
          <div
            onClick={resetSearch}
            className="cursor-pointer py-2 flex justify-center items-center hover:text-amber-200 duration-300"
          >
            ❌ Effacer les résultats
          </div>
        </div>
      )}
    </div>
  );
}
