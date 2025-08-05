import { useSharesStore } from "@/stores/sharing/useSharingStore";
import type { activListShare } from "@/types/ListShare";
import { useState } from "react";
import { toast } from "sonner";

interface ActivSharingsProps {
  share: activListShare;
}

export default function ActivSharings({ share }: ActivSharingsProps) {
  const [accessLevel, setAccessLevel] = useState(share.access_level);

  const { updateShare,removeShare } = useSharesStore();

  async function handleShareUpdate(newLevel: 1 | 2 | 3 | 4 | 5) {
    if (newLevel === 5) {
      // console.log("Suppression du partage");
      try {
        await removeShare(share.list_id, share.user_id);
        toast.success("Partage supprimé avec succès");
      } catch (error) {
        toast.error("Erreur lors de la suppression du partage");
        console.error(error);
      }
    } else {
      try {
        await updateShare(share.list_id, share.user_id, newLevel);
        toast.success("Partage mis à jour avec succès");
      } catch (error) {
        toast.error("Erreur lors de la mise à jour du partage");
        console.error(error);
      }
    }
  }

  return (
    <div className="p-2 border-b border-gray-200 flex flex-col justify-between items-center">
      <p className="mb-2">{share.user_name} qui peut</p>

      <form className="flex">
        <select
          className="bg-amber-100 text-slate-900 ml-2 focus:bg-amber-200 rounded-md px-2 py-1"
          value={accessLevel}
          onChange={(e) => {
            const newAccessLevel = Number(e.target.value) as 1 | 2 | 3 | 4;
            setAccessLevel(newAccessLevel);
            handleShareUpdate(newAccessLevel);
          }}
        >
          <option value="1">lire</option>
          <option value="2">et ajouter des notes</option>
          <option value="3">et modifier ses notes</option>
          <option value="4">et toutes les notes</option>
          <option value="5">ne plus partager</option>
        </select>
      </form>
    </div>
  );
}
