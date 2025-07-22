/* eslint-disable react-hooks/exhaustive-deps */
import { useUserLinksStore } from "@/stores/links/usersLinksStore";
import OneBlockedUser from "./OneBlockedUser";
import { useEffect } from "react";

export default function BlockedUsers() {
  const { blockedUsers, isLoading, fetchUserLinks } = useUserLinksStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserLinks();
    };
    fetchData();
  }, [fetchUserLinks]);

  return (
    <div>
      {isLoading ? (
        <p>Chargement...</p>
      ) : blockedUsers.length === 0 ? (
        <p>Tu n’as pas de lien.</p>
      ) : (
        <>
          <h2 className="mt-4 mb-2">Les Utilisateurs que j'ai bloqués :</h2>
          <div className="flex flex-col gap-2">
            {blockedUsers.map((blockedUser) => (
              <OneBlockedUser key={blockedUser.id} blockedUser={blockedUser} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
