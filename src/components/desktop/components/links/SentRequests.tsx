/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useUserLinksStore } from "@/stores/links/usersLinksStore";
import OneReceived from "./OneReceived";

export default function SentRequests() {

  const { receivedRequests, isLoading, fetchUserLinks } =
    useUserLinksStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserLinks();
      console.log("Fetching pending sent requests:", receivedRequests);
    };
    fetchData();
    console.log("pendingSentRequests:", receivedRequests);
  }, [fetchUserLinks]);

  return (
    <div>
          {isLoading ? (
            <p>Chargement...</p>
          ) : receivedRequests.length === 0 ? (
            <p>Tu n’as pas de lien.</p>
          ) : (
            <>
              <h2>Mes Demandes en Reçues</h2>
              <div className="flex flex-col gap-2">
                {receivedRequests.map((friend) => (
                  <OneReceived key={friend.id} friend={friend} />
                ))}
              </div>
            </>
          )}
        </div>
  )
}
