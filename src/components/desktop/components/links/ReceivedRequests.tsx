/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useUserLinksStore } from "@/stores/links/usersLinksStore";
import OneSent from "./OneSent";

export default function ReceivedRequests() {
  const { pendingSentRequests, isLoading, fetchUserLinks } =
    useUserLinksStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserLinks();
      console.log("Fetching pending sent requests:", pendingSentRequests);
    };
    fetchData();
    console.log("pendingSentRequests:", pendingSentRequests);
  }, [fetchUserLinks]);
  return (
    <div>
      <h2>Mes Demandes Reçues</h2>
      {isLoading ? (
        <p>Chargement...</p>
      ) : pendingSentRequests.length === 0 ? (
        <p>Tu n’as pas de lien.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {pendingSentRequests.map((friend) => (
            <OneSent key={friend.id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
}
