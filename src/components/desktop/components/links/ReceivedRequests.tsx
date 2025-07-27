// import { useEffect } from "react";
import { useUserLinksStore } from "@/stores/links/usersLinksStore";
import OneReceived from "./OneReceived";

export default function ReceivedRequests() {
  const { receivedRequests, isLoading } =
    useUserLinksStore();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchUserLinks();
  //     // console.log("Fetching pending sent requests:", pendingSentRequests);
  //   };
  //   fetchData();
  //   // console.log("pendingSentRequests:", pendingSentRequests);
  // }, [fetchUserLinks]);

  return (
    <div>
      {isLoading ? (
        <p>Chargement...</p>
      ) : receivedRequests.length === 0 ? (
        <p>Tu n’as pas de lien.</p>
      ) : (
        <>
          <h2  className="mt-4 mb-2">Mes Demandes à Valider</h2>
          <div className="flex flex-col gap-2">
            {receivedRequests.map((friend) => (
              <OneReceived key={friend.id} friend={friend} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
