import { useUserLinksStore } from "@/stores/links/usersLinksStore";
import type { Friend } from "@/types/Friends";
import { TiUserDelete } from "react-icons/ti";
import { TiUserAdd } from "react-icons/ti";
import { toast } from "sonner";

interface OneReceivedProps {
  friend: Friend;
}

export default function OneReceived({ friend }: OneReceivedProps) {
  const acceptRequest = useUserLinksStore((state) => state.acceptRequest);
  const declineRequest = useUserLinksStore((state) => state.declineRequest);

  const handleAcceptRequest = async () => {
    try {
      await acceptRequest(friend.id);
      toast.success(`Vous avez accepté le lien avec ${friend.name}`);
    } catch {
      toast.error(`Échec de la liaison avec ${friend.name}`);
    }
  };
  const handleRejectRequest = async () => {
    try {
      await declineRequest(friend.id);
      toast.success(`Vous avez rejeté le lien avec ${friend.name}`);
    } catch {
      toast.error(`Echec du refus du lien avec ${friend.name}`);
    }
  };

  return (
    <div className="rounded-lg shadow border-2 border-amber-100 bg-slate-700 p-2 flex items-center justify-between hover:bg-slate-600 transition-colors duration-300 w-[90%] max-w-[250px]">
      <div
        className="text-2xl p-2 pl-0 text-green-300 hover:text-green-500 cursor-pointer transition-colors duration-300"
        onClick={handleAcceptRequest}
      >
        <TiUserAdd />
      </div>
      <div className="flex flex-col justify-start overflow-hidden grow">
        <p className="text-amber-100">{friend.name}</p>
        <p className="text-xs text-gray-200">{friend.email}</p>
      </div>
      <div
        className="text-2xl p-2 text-red-300 hover:text-red-500 cursor-pointer transition-colors duration-300"
        onClick={handleRejectRequest}
      >
        <TiUserDelete />
      </div>
    </div>
  );
}
