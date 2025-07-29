/* eslint-disable react-hooks/exhaustive-deps */
// UserLinksLoader.tsx
import { useEffect } from "react";
import { useUserLinksStore } from "@/stores/links/usersLinksStore";

export default function UserLinksLoader({ children }: { children: React.ReactNode }) {
  const { hasFetched, fetchUserLinks } = useUserLinksStore();

  useEffect(() => {
    if (!hasFetched) {
      fetchUserLinks();
    }
  }, [hasFetched]);

  return <>{children}</>;
}
