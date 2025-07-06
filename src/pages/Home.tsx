import { useAuthStore } from "@/stores/users/useAuthStore";
import HomeNoConnected from "./HomeNoConnected";
import HomeConnected from "./HomeConnected";

export default function Home() {
  const user = useAuthStore((state) => state.user);



  return user ? <HomeConnected user={user} /> : <HomeNoConnected />;
}
