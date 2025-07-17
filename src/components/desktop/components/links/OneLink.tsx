import { useUserLinksStore } from "@/stores/links/usersLinksStore";
import type { Friend } from "@/types/Friends";
import { TiUserDelete } from "react-icons/ti";
import { toast } from "sonner";

interface OneLinkProps {
  friend: Friend;
}

export default function OneLink({ friend }: OneLinkProps) {
  const breakLink = useUserLinksStore((state) => state.breakLink);

  const handleActiveLink = async () => {
  const confirmDelete = window.confirm(
    `⚠️ Es-tu sûr de vouloir supprimer ta relation avec ${friend.name} ?`
  );

  if (!confirmDelete) return;

  try {
    await breakLink(friend.id);
    toast.success(`Lien avec ${friend.name} supprimé`);
  } catch (error) {
    console.error(error); 
    toast.error(`Impossible de supprimer le lien avec ${friend.name}`);
  }
};


  return (
    <div className="rounded-lg shadow border-2 border-amber-100 bg-slate-700 p-2 flex items-center justify-between hover:bg-slate-600 transition-colors duration-300">
      <div className="flex flex-col">
        <p className="text-amber-100">{friend.name}</p>
        <p className="text-xs text-gray-200">{friend.email}</p>
      </div>
      <div
        className="text-2xl p-2 pr-1 text-red-300 hover:text-red-500 cursor-pointer transition-colors duration-300"
        onClick={handleActiveLink}
      >
        <TiUserDelete />
      </div>
    </div>
  );
}
