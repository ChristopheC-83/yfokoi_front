import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/users/useAuthStore";

export default function NoConnectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/");  
    }
  }, [user, navigate]);

  return <>{children}</>;
}
