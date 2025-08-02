/* eslint-disable @typescript-eslint/no-unused-vars */
import type { User } from "@/types/User";
import ActiveShares from "./components/sharing/ActiveShares";
import FriendsNoAccess from "./components/sharing/FriendsNoAccess";

interface DesktopSharingProps {
  user: User;
}

export default function DesktopSharing({ user }: DesktopSharingProps) {

  return (
    <div className="p-3 w-[240px] shrink-0">
      {" "}
      <h1 className="text-center bg-amber-100 text-slate-900 rounded-full px-3 py-2 text-xl font-bold">
        Gestion du Partage
      </h1>
      {/* personne ayant accés à cette liste avec gestion de leur niveau d'accés */}
      <ActiveShares />
      {/* les "amis n'ayant pas accés à cette liste avec Select => accés" */}
      <FriendsNoAccess />
    </div>
  );
}
