import InputField from "@/components/elements/InputField";
import useListsManager from "@/hooks/lists/useListsManager";
import { useState } from "react";

export default function CreateListForm() {
  const [newList, setNewList] = useState<string>("");
  const { createNewList, error } = useListsManager();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newList.trim() === "") {
      console.error("Le nom de la liste ne peut pas être vide !");
      return;
    }
    if(await createNewList(newList)){
      setNewList(""); 

    }
  }

  return (
    <form className="w-full flex flex-col space-y-2" onSubmit={handleSubmit}>
      <InputField
        label=""
        id="newList"
        value={newList}
        type="text"
        onChange={(e) => setNewList(e.target.value)}
      />

      <button
        className={`bg-slate-900 p-2 w-full rounded-lg border-2 border-slate-950 mb-7 text-amber-100 hover:bg-slate-700 hover:text-amber-300 duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed -mt-2 `}
      >
        Créer la liste
      </button>
      
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
