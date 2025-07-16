import type { Friend } from "@/types/Friends";
import { MdCancel } from "react-icons/md";

interface OneLinkProps {
  friend: Friend;
}

export default function OneSent({ friend }: OneLinkProps) {
  return (
    <div className="rounded-lg shadow border-2 border-amber-100 bg-slate-700 p-2 flex items-center justify-between hover:bg-slate-600 transition-colors duration-300">
      
      <div className="flex flex-col">
        <p className="text-amber-100">{friend.name}</p>
        
      </div>
      <div className="text-2xl p-2 text-red-300 hover:text-red-500 cursor-pointer transition-colors duration-300">
        <MdCancel />
      </div>
    </div>
  );
}
