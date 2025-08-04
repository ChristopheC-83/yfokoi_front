/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSharesStore } from "@/stores/sharing/useSharingStore";
import { useUserContextStore } from "@/stores/users/useUserContextStore";
import type { activListShare } from "@/types/ListShare";
import { useEffect, useState } from "react";
import ActivSharings from "./components/ActivSharings";

export default function ActiveShares() {
  const { shares, isLoading, fetchAllShares } = useSharesStore();
  const { selectedListId } = useUserContextStore();
  const [activSharings, setActiveSharings] = useState<activListShare[]>([]);

  useEffect(() => {
    fetchAllShares();
  }, []);

  useEffect(() => {
    // console.table(shares);
    // console.log("selectedListId", selectedListId);
    const activSharingsForThisList = shares.filter(
      (share) => share.list_id === selectedListId
    );
    setActiveSharings(activSharingsForThisList);
    // console.log("activSharingsForThisList", activSharingsForThisList);
  }, [shares, selectedListId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (activSharings.length === 0) {
    return <div className="my-3">Cette liste n'est pas partagée.</div>;
  }
  return (
    <div>
      <h2 className="mt-4 mb-2 font-bold underline underline-offset-4 text-center">
        Partages pour cette liste :
      </h2>
      {activSharings.map((share) => (
        <ActivSharings key={share.id} share={share} />
      ))}
    </div>
  );
}
