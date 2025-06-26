import { useAuthStore } from "@/Context/useAuthStore";
import type { User } from "@/types/User";



interface DesktopContentProps {
  user: User;
}

export default function DesktopContent({ user }: DesktopContentProps) {

  
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
