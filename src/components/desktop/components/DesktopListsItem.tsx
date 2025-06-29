import { useUserContextStore } from "@/Context/useUserContextStore";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

interface ListItemCardProps {
  id: number;
  name: string;
  ownerName: string | number;
  ownedList?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
}

export default function DesktopListsItem({
  id,
  name,
  ownerName,
  onClick,
  isSelected,
}: ListItemCardProps) {
  const favoriteListId = useUserContextStore((state) => state.favoriteListId);

  return (
    <div
      key={id}
      className={`m-1 py-2 px-3 cursor-pointer hover:text-amber-300 hover:bg-slate-700 duration-300 rounded-lg ${
        isSelected && "bg-slate-900"
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between">
        <h2
          className={`text-lg font-semibold ${isSelected && "text-amber-200"}`}
        >
          {name}
        </h2>
        <div className="pl-3 pt-3 pr-1 pb-1 cursor-heart">{favoriteListId === id ? <FaHeart /> : <FaRegHeart />}</div>
      </div>
      <p className="text-gray-600">
        Liste de : {ownerName} <span className="text-sm ml-2">(id : {id})</span>
      </p>
    </div>
  );
}
