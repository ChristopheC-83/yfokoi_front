
import { useAuthStore } from "@/Context/useAuthStore";
import { useUserContextStore } from "@/Context/useUserContextStore";
import { useEffect } from "react";

export default function DesktopContent() {

  const user = useAuthStore((state) => state.user);
  const userContext = useUserContextStore((state) => state.userContext);

  useEffect(() => {
    if (user) {
      useUserContextStore.getState().createOrUpdateUserContext();
      // console.log("userContext", userContext);
    }
  }, [user, userContext]);

  

  return (
    <div className="mx-auto w-full max-w-screen-xl flex flex-col">
      <div>DesktopContent</div>
      {user && (
        <div className="p-4">
          <h2 className="text-2xl font-bold text-amber-100">Bienvenue, {user.name} !</h2>
          <p>ton id est {user.id}</p>
          <p>ton email est {user.email}</p>
          <p>ton token est {useAuthStore.getState().token?.length}</p>
        </div>
      )}
    </div>
  );
}
