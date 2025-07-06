/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthStore } from "@/stores/users/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ConnectedRoute({
  children, 
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user)!;
  const initUserFromToken = useAuthStore((state) => state.initUserFromToken);

  useEffect(() => {
    initUserFromToken();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (!user) return null;

  return <>{children}</>;
}
