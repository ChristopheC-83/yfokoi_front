/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect } from "react";
import { useUserLinksStore } from "@/stores/links/usersLinksStore";
import OneSent from "./OneSent";

export default function SentRequests() {
  const { pendingSentRequests, isLoading } = useUserLinksStore();

  // useEffect(() => {
  //   if (!hasFetched) {
  //     fetchUserLinks();
  //   }
  // }, [hasFetched]);

  return (
    <div>
      {isLoading ? (
        <p>Chargement...</p>
      ) : pendingSentRequests.length === 0 ? (
        <p>Tu n’as pas de lien.</p>
      ) : (
        <>
          <h2 className="mt-4 mb-2">Mes Demandes Envoyées</h2>
          <div className="flex flex-col gap-2">
            {pendingSentRequests.map((friend) => (
              <OneSent key={friend.id} friend={friend} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
