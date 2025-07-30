import { useUserLinksStore } from "@/stores/links/usersLinksStore";
import type { Friend } from "@/types/Friends";
import { MdCancel } from "react-icons/md";
import { toast } from "sonner";

interface OneLinkProps {
  friend: Friend;
}

export default function OneSent({ friend }: OneLinkProps) {
  const cancelRequest = useUserLinksStore((state) => state.cancelRequest);

  const handleSendRequest = async () => {
    // Logique pour annuler la demande envoyée
    console.log(`Annuler la demande envoyée à ${friend.name}`);

    try {
      await cancelRequest(friend.id);
      toast.success(`Suppression de la demande de lien avec ${friend.name}`);
    } catch {
      toast.error(`Échec de la suppression de l'envoi à ${friend.name}`);
    }
  };

  return (
    <div className="rounded-lg shadow border-2 border-amber-100 bg-slate-700 p-2 flex items-center justify-between hover:bg-slate-600 transition-colors duration-300 w-[90%] max-w-[250px]">
      <div className="flex flex-col">
        <p className="text-amber-100">{friend.name}</p>
      </div>
      <div
        className="text-2xl p-2 pr-1 text-red-300 hover:text-red-500 cursor-pointer transition-colors duration-300"
        onClick={handleSendRequest}
      >
        <MdCancel />
      </div>
    </div>
  );
}
