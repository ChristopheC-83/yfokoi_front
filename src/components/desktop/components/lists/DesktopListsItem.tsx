import { useUserContextStore } from "@/stores/users/useUserContextStore";
import useListsManager from "@/hooks/lists/useListsManager";
import { updateFavoriteListIdFromApi } from "@/services/userContext/updateUserContext";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";

import { toast } from "sonner";

interface ListItemCardProps {
  id: number;
  name: string;
  ownerName: string | number;
  ownedList?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
  isOwnedList?: boolean;
}

export default function DesktopListsItem({
  id,
  name,
  ownerName,
  onClick,
  isSelected,
  isOwnedList,
}: ListItemCardProps) {
  const favoriteListId = useUserContextStore((state) => state.favoriteListId);
  const setFavoriteListId = useUserContextStore(
    (state) => state.setFavoriteListId
  );
  const { deleteList } = useListsManager();

  async function changeFavoriteList(id: number) {
    if (await updateFavoriteListIdFromApi(id)) {
      setFavoriteListId(id);
      toast.success(`Liste favorite changée `);
      toast.info("Elle sera ta liste par défaut à ta prochaine connexion !");
    }
  }

  async function trashList() {
  const confirmDelete = window.confirm("⚠️ Es-tu sûr de vouloir supprimer cette liste et ses éléments ?");

  if (!confirmDelete) return;

  if (await deleteList(id)) {
    toast.info(`Liste supprimée avec succès`);
    // console.log("Suppression de la liste avec l'ID :", id);
  }
}

  return (
    <div
      className={`flex items-stretch  m-1 py-1   hover:text-amber-300 hover:bg-slate-700 duration-300 rounded-lg  ${
        isSelected && "bg-slate-900"
      }`}
      key={id}
    >
      <div
        className="flex justify-center items-start pt-2 cursor-heart w-10 text-2xl"
        onClick={() => changeFavoriteList(id)}
      >
        {favoriteListId === id ? <FaHeart /> : <FaRegHeart />}
      </div>
      <div className="flex flex-col cursor-loupe grow-1 " onClick={onClick}>
        <h2 className={`font-semibold ${isSelected && "text-amber-200"}`}>
          {name}
        </h2>
        <p className="text-gray-600">Liste de : {ownerName} </p>
        <p className="text-sm text-gray-600">(id : {id})</p>
      </div>
      {isOwnedList && <div
        className="w-6 flex justify-center items-start cursor-trash pt-2 " onClick={()=> trashList()}>
        <FaRegTrashCan />
      </div>}
    </div>
  );
}
