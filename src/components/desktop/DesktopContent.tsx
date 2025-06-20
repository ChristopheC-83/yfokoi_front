
import { useAuthStore } from "@/Context/useAuthStore";

export default function DesktopContent() {

  const user = useAuthStore((state) => state.user);

  

  return (
    <>
      <div>DesktopContent</div>
      {user && (
        <div className="p-4">
          <h2 className="text-2xl font-bold text-amber-100">Bienvenue, {user.name} !</h2>
          <p>ton id est {user.id}</p>
          <p>ton email est {user.email}</p>
          <p>ton token est {useAuthStore.getState().token?.length}</p>
        </div>
      )}
    </>
  );
}
