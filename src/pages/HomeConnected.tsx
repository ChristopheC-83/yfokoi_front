/* eslint-disable react-hooks/exhaustive-deps */
import DesktopContent from "@/components/desktop/DesktopContent";
import DesktopFriends from "@/components/desktop/DesktopFriends";
import DesktopLists from "@/components/desktop/DesktopLists";
import DesktopSharing from "@/components/desktop/DesktopSharing";
import useViewport from "@/hooks/useIsDesktop";
import { useUserContextStore } from "@/Context/useUserContextStore";
import { useEffect } from "react";
import type { User } from "@/types/User";

interface HomeConnectedProps {
  user: User;
}

export default function HomeConnected({ user }: HomeConnectedProps) {
  const viewport = useViewport();
  const createOrUpdateUserContext = useUserContextStore((state) => state.createOrUpdateUserContext);

  useEffect(() => {
    if (!user) return;
    console.log("🏁 Chargement du contexte utilisateur...");
    createOrUpdateUserContext();
  }, []);

  return (
    <section className="flex justify-between w-full">
      {(viewport === "desktop" || viewport === "tablet") && <DesktopLists user={user} />}
      {(viewport === "desktop" || viewport === "tablet") && <DesktopContent user={user} />}
      {viewport === "desktop" && (
        <section className="flex flex-col">
          <DesktopSharing user={user} />
          <DesktopFriends user={user} />
        </section>
      )}
    </section>
  );
}
