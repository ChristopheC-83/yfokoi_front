// import { useEffect } from "react";
import { useUserLinksStore } from "@/stores/links/usersLinksStore";
import OneLink from "./OneLink";

export default function MyLinks() {
  const { friends, isLoading } = useUserLinksStore();

  // useEffect(() => {
  //   // Appel asynchrone dans une fonction interne
  //   const fetchData = async () => {
  //     await fetchUserLinks();
  //     // console.log("Fetching users links for:", friends);
  //   };
  //   fetchData();
  //   // console.log("friends:", friends);
  // }, [fetchUserLinks]);

  return (
    <div className="w-full mb-10">
      <h2 className="mt-4 mb-2 font-bold underline underline-offset-4">
        Mes Liens actifs
      </h2>
      {isLoading ? (
        <p>Chargement...</p>
      ) : friends.length === 0 ? (
        <p>
          Tu n’as pas encore de lien !<br />
          Fais une recherche ou partage cette app avec tes proches !
        </p>
      ) : (
            <div className="flex flex-wrap gap-3 max-md:justify-center">
          {friends.map((friend) => (
            <OneLink key={friend.id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
}
