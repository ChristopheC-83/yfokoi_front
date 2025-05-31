/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

type List = {
  id: number;
  name: string;
  owner_id: number;
  created_at: string;
  updated_at: string;
  is_archived: number;
};

export default function DesktopLists() {
const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const url = "http://localhost/YOFOKOI/yfokoi_back/api_lists/getAllLists";
  async function fetchAllLists() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      // console.log(response);

      if (!response.ok) {
        throw new Error("Problème lors de la récupération des données");
      }
      const data = await response.json();
      
      setLists(data);
    } catch (err) {
      setError("Failed to fetch lists");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllLists();
    console.log(lists);
  }, []);

  return (
    <div>
      <h1>DesktopLists</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {lists.map((list, index) => (
        <div key={index} className="p-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold">{list.name}</h2>
          <p className="text-gray-600">Liste de : {list.owner_id}</p>
        </div>
      ))}
    </div>
  );
}
