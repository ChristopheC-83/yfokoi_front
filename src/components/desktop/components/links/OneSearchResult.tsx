import { useUserLinksStore } from "@/stores/links/usersLinksStore";
import { toast } from "sonner";
import { BsFillSendPlusFill } from "react-icons/bs";


type ResultProps = {
  result: { id: number; name: string; avatar?: string };
  onRequestSent: (userId: number) => void; // nouvelle prop
};

export default function OneSearchResult({ result, onRequestSent }: ResultProps) {
  const sendRequest = useUserLinksStore((state) => state.sendRequest);

  const handleSendRequest = async () => {
    try {
      await sendRequest(result.id, result.name);
      onRequestSent(result.id); // on prévient le parent
      toast.success(`Demande envoyée à ${result.name}`);
    } catch {
      toast.error(`Échec de l'envoi de la demande à ${result.name}`);
    }
  };

  return (
    <div
      className="rounded-lg shadow border-2 border-amber-100 bg-slate-700 pl-2 flex items-center justify-between hover:bg-slate-600 transition-colors duration-300"
    >
      <div className="flex justify-between w-full py-1 items-center">
        {result.name}
        <div
          className="text-xl p-2 pr-3 text-green-300 hover:text-green-500 cursor-pointer transition-colors duration-300"
          onClick={handleSendRequest}
        >
          <BsFillSendPlusFill />
        </div>
      </div>
    </div>
  );
}
