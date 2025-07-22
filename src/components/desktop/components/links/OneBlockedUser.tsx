import { useUserLinksStore } from "@/stores/links/usersLinksStore";
import { TbLock } from "react-icons/tb";
import { TbLockOpen } from "react-icons/tb";
import { TbArrowBigRight } from "react-icons/tb";
import { toast } from "sonner";

interface OneBlockedUserProps {
  blockedUser: {
    id: number;
    name: string;
    // Add other properties as needed
  };
}

export default function OneBlockedUser({ blockedUser }: OneBlockedUserProps) {
  const breakLink = useUserLinksStore((state) => state.breakLink);

  const handleBreakReject = async () => {
    const confirmDelete = window.confirm(
      `⚠️ Es-tu sûr de vouloir débloquer ${blockedUser.name} ?`
    );

    if (!confirmDelete) return;

    try {
      await breakLink(blockedUser.id);
      toast.success(`Lien avec ${blockedUser.name} supprimé`);
    } catch (error) {
      console.error(error);
      toast.error(`Impossible de supprimer le lien avec ${blockedUser.name}`);
    }
  };
  return (
    <div className="rounded-lg shadow border-2 border-amber-100 bg-slate-700 p-2 flex items-center justify-between hover:bg-slate-600 transition-colors duration-300">
      <div className="flex flex-col">
        <p className="text-amber-100">{blockedUser.name}</p>
      </div>
      <div
        className="text-2xl p-2 pr-1 text-red-300 hover:text-red-500 cursor-pointer transition-colors duration-300"
       
      >
        <div className="flex" onClick={handleBreakReject}>
          <TbLock />
          <TbArrowBigRight />
          <TbLockOpen />
        </div>
      </div>
    </div>
  );
}
