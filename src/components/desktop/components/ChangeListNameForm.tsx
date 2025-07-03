import useModifyNameList from "@/services/lists/useModifyNameList";
import { useState } from "react";
// import { toast } from "sonner";

import type { AccessList, OwnedList } from "@/types/List";

interface ChangeListNameFormProps {
  currentList: OwnedList | AccessList;
}

export default function ChangeListNameForm({currentList}: ChangeListNameFormProps) {

  const [newNameList, setNewNameList] = useState("");
  const {modifyNameList, error} = useModifyNameList();

  async function handleModifyNameList(e: React.FormEvent) {
    e.preventDefault();
    if(await modifyNameList({ currentList }, newNameList)){
    setNewNameList("")}
    }
  
  return (
    <form onSubmit={handleModifyNameList} className="flex justify-center gap-x-2">
      <input
        type="text"
        className="border border-amber-200 rounded px-2 py-1 bg-slate-800 w-[96vw] max-w-80"
        placeholder="Nouveau nom pour la liste"
        onChange={(e) => setNewNameList(e.target.value)}
      />
      <button
        type="submit"
        className="cursor-pointer text-3xl"
      >
        ✅
      </button>
      
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
