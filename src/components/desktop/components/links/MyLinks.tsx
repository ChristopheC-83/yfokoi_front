/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useUserLinksStore } from "@/stores/links/usersLinksStore";
import OneLink from "./OneLink";



export default function MyLinks() {
  const { friends, isLoading, fetchUserLinks } = useUserLinksStore();

  useEffect(() => {
    // Appel asynchrone dans une fonction interne
    const fetchData = async () => {
      await fetchUserLinks();
      console.log("Fetching users links for:", friends);
    };
    fetchData();
    console.log("friends:", friends);
  }, [fetchUserLinks]);

  return (
      <div>
        <h2>Mes Liens actifs</h2>
        {isLoading ? (
          <p>Chargement...</p>
        ) : friends.length === 0 ? (
          <p>Tu n’as pas de lien.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {friends.map((friend) => (
              <OneLink key={friend.id} friend={friend}/> 
            ))}
          </div>
        )}
      </div>
  );
}
