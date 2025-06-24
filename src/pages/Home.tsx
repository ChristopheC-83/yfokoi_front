import { useAuthStore } from "@/Context/useAuthStore";
import { useEffect } from "react";
import HomeNoConnected from "./HomeNoConnected";
import HomeConnected from "./HomeConnected";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    if (!user) {
      // Redirection logic or any other action if user is not authenticated
      console.log("User is not authenticated");
    } else {
      // Logic for authenticated user
      console.log("User is authenticated:", user);
    }
  }, [user]);

  return user ? <HomeConnected /> : <HomeNoConnected />;
}
