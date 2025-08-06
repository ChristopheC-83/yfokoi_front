/* eslint-disable react-hooks/exhaustive-deps */
import { useSharesStore } from "@/stores/sharing/useSharingStore";
import { useUserContextStore } from "@/stores/users/useUserContextStore";
import type { activListShare } from "@/types/ListShare";
import { useEffect, useState } from "react";
import ActivSharings from "./components/ActivSharings";
import InactivSharings from "./components/InactivSharings";
import { useUserLinksStore } from "@/stores/links/usersLinksStore";
import type { Friends } from "@/types/Friends";
import { useListsStore } from "@/stores/lists/useListsStore";

export default function ActiveShares() {
  const { shares, isLoading, fetchAllShares } = useSharesStore();
  const { friends, fetchUserLinks, hasFetched } = useUserLinksStore();
  const { selectedListId } = useUserContextStore();
  const [activSharings, setActiveSharings] = useState<activListShare[]>([]);
  const [inActivSharings, setInActiveSharings] = useState<Friends>([]);
  const {ownedLists} = useListsStore();
  const [isOwnerList, setIsOwnerList] = useState<boolean>(false);

  useEffect(() => {
    fetchAllShares();
  }, []);

  // Une fois au premier render (fetch si besoin)
  useEffect(() => {
    if (!hasFetched) {
      fetchUserLinks();
    }
  

  }, [hasFetched]);

  function processSharings(
    shares: activListShare[],
    friends: Friends,
    selectedListId: number | null
  ): {
    activSharings: activListShare[];
    inActivSharings: Friends;
  } {
    if (selectedListId === null) {
      return {
        activSharings: [],
        inActivSharings: friends,
      };
    }

    const activSharings = shares
      .filter((share) => share.list_id === selectedListId)
      .map((share) => ({
        ...share,
        user_name:
          share.user_name ||
          friends.find((f) => f.id === share.user_id)?.name ||
          "inconnu",
      }));

    const sharedUserIds = activSharings.map((s) => s.user_id);

    const inActivSharings = friends.filter(
      (friend) => !sharedUserIds.includes(friend.id)
    );
    console.log("inActivSharings:", inActivSharings);
    console.log("activSharings:", activSharings);

    return { activSharings, inActivSharings };
  }

  useEffect(() => {
    const { activSharings, inActivSharings } = processSharings(
      shares,
      friends,
      selectedListId
    );
    setActiveSharings(activSharings);
    setInActiveSharings(inActivSharings);

    const isOwner =
    selectedListId !== null &&
    ownedLists.some((list) => list.id === selectedListId);
    setIsOwnerList(isOwner);
  }, [shares, selectedListId, friends]);


  if(!isOwnerList){
    return <div className="text-center my-4">Vous n'êtes pas autorisé à partager cette liste.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {activSharings.length === 0 ? (
        <div className="my-3">Cette liste n'est pas partagée.</div>
      ) : (
        <>
          <h2 className="mt-4 mb-2 font-bold underline underline-offset-4 text-center">
            Partages pour cette liste :
          </h2>
          {activSharings.map((share) => (
            <ActivSharings key={share.id} share={share} />
          ))}
        </>
      )}
      {inActivSharings.length === 0 ? (
        <div className="my-3">Personne avec qui partager.</div>
      ) : (
        <>
          <h2 className="mt-8 mb-2 font-bold underline underline-offset-4 text-center">
            Partager cette liste avec :
          </h2>
          {selectedListId !== null &&
            inActivSharings.map((friend) => (
              <InactivSharings
                key={friend.id}
                friend={friend}
                selectedListId={selectedListId}
              />
            ))}
        </>
      )}
    </div>
  );
}
