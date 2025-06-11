import { useAuthStore } from "@/Context/useAuthStore";
import {  useNavigate } from "react-router-dom";




export default function Profile() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  if (!user) {
    navigate("/login");
    return null; 
  }
  return (
    <div>
      <h1>profile</h1>
      mon compte est : {user.name}
    </div>
  );
}
