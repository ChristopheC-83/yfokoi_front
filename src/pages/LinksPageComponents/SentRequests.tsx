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
    <div className="w-full mb-10">
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        pendingSentRequests.length !== 0 && (
          <>
            <h2 className="mt-4 mb-2 font-bold underline underline-offset-4">
              Mes Demandes Envoyées :
            </h2>
            <div className="flex flex-wrap gap-3 max-md:justify-center">
              {pendingSentRequests.map((friend) => (
                <OneSent key={friend.id} friend={friend} />
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
}
