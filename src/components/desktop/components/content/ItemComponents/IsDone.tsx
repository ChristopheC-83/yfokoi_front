import type { Item } from "@/types/Item";

interface IsDoneProps {
  item: Item;
}

export default function IsDone({item} : IsDoneProps) {
  return (
    
          <div className="text-2xl p-2 mr-2"
          
          >{item.is_done ? "✅" : "⏹️"}</div>
  )
}
