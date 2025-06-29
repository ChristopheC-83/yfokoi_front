

interface ListItemCardProps {
  id: number;
  name: string;
  ownerName: string | number;
  ownedList?: boolean;
  onClick?: () => void;
}

export default function DesktopListsItem({ id, name, ownerName, onClick }: ListItemCardProps) {
  return (
       <div
      key={id}
      className="p-4 border-b border-gray-300 cursor-pointer hover:text-amber-300 hover:bg-slate-700 duration-300"
      onClick={onClick}
    >
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">Liste de : {ownerName}</p>
    </div>
  )
}
