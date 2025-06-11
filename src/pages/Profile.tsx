import { useAuthStore } from "@/Context/useAuthStore";

export default function Profile() {
  const user = useAuthStore((state) => state.user);

  console.log(user);
  return (
    <div>
      <h1>profile</h1>
      mon compte est : {user?.name || "Invité"}
    </div>
  );
}
