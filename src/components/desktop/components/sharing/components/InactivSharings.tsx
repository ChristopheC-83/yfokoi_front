import { useSharesStore } from "@/stores/sharing/useSharingStore";
import type { Friend } from "@/types/Friends";
import { useEffect } from "react";
import { TiUserAdd } from "react-icons/ti";
import { toast } from "sonner";

interface InactivSharingsProps {
  friend: Friend;
  selectedListId: number;
}

export default function InactivSharings({ friend, selectedListId }: InactivSharingsProps) {

    const {addShare} = useSharesStore();
  useEffect(() => {
    console.log("InactivSharings friend:", friend);
  }, [friend]);

  async function handleAddShare() {
      
      try {
          await addShare(friend.id,selectedListId);
          toast.success("Partage activé avec succès");
        //   console.log("Adding share for friend:", friend);
        //   console.log("Selected List ID:", selectedListId);
        //   console.log("friend.id:", friend.id);
      } catch (error) {
        toast.error("Erreur lors de l'activation du partage");
        console.error(error);
      }
  }


  return (
    <div
      className="p-2 border-b border-gray-200 flex justify-between items-center cursor-pointer"
      onClick={handleAddShare}
    >
      <p>{friend.name}</p>
      <p className="text-xl">
        <TiUserAdd />
      </p>
    </div>
  );
}
