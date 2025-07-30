import { useAuthStore } from "@/stores/users/useAuthStore";
import BlockedUsers from "./LinksPageComponents/BlockedUsers";
import MyLinks from "./LinksPageComponents/MyLinks";
import ReceivedRequests from "./LinksPageComponents/ReceivedRequests";
import SearchLinks from "./LinksPageComponents/SearchLinks";
import SentRequests from "./LinksPageComponents/SentRequests";
import UserLinksLoader from "./LinksPageComponents/UserLinksLoader";

export default function Links() {
  
    const user = useAuthStore((state) => state.user)!;

  return (
    <div className="flex flex-col items-center justify-items-start p-4 text-amber-100 w-[96%] max-w-[900px] mx-auto">
      <h2 className="text-2xl font-bold text-amber-100 my-5">
        Gestion des liens de {user.name}.
      </h2>

      {/* UserLinksLoader => recréer un composant dédié dans un autre dossier pour organisation */}
      <UserLinksLoader>
        <h1>Mes liens</h1>

        {/* recherche utilisateurs */}
        <SearchLinks />

        {/* Demandes envoyées en attente */}
        <ReceivedRequests />

        {/* Demandes reçues en attente */}
        <SentRequests />

        {/*  Mes liens validés */}
        <MyLinks />

        {/*  liens bloqués */}
        <BlockedUsers />
      </UserLinksLoader>
    </div>
  );
}
