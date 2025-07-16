/* eslint-disable @typescript-eslint/no-unused-vars */

import type { User } from "@/types/User";
import MyLinks from "./components/links/MyLinks";
import ReceivedRequests from "./components/links/ReceivedRequests";
import SentRequests from "./components/links/SentRequests";
import SearchLinks from "./components/links/SearchLinks";

interface DesktopFriendsProps {
  user: User;
}

export default function DesktopFriends({ user }: DesktopFriendsProps) {
  return (
    <div className="p-3 w-[240px] shrink-0">
      <h1 className="text-center bg-amber-100 text-slate-900 rounded-full px-3 py-2 text-xl font-bold">
        Mes Liens :
      </h1>

      
      {/* recherche utilisateurs */}
      <SearchLinks />

      {/* Demandes envoyées en attente */}
      <ReceivedRequests />


      {/* Demandes reçues en attente */}
      <SentRequests />



      {/*  Mes liens validés */}
      <MyLinks />
    </div>
  );
}
