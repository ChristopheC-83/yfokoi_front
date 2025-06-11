import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/Context/useAuthStore";

export default function UnconnectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/"); // ou dashboard
    }
  }, [user, navigate]);

  if (user) return null;

  return <>{children}</>;
}
