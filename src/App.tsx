/* eslint-disable react-hooks/exhaustive-deps */
// App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ConnectedRoute from "./components/ConnectedRoute";
import NoConnectedRoute from "./components/NoConnectedRoute";
import { useEffect } from "react";
import { useAuthStore } from "./Context/useAuthStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "login",
        element: (
          <NoConnectedRoute>
            <Login />
          </NoConnectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <NoConnectedRoute>
            <Register />
          </NoConnectedRoute>
        ),
      },
      {
        path: "profil",
        element: (
          <ConnectedRoute>
            <Profile />
          </ConnectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  const initUserFromToken = useAuthStore((state) => state.initUserFromToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    initUserFromToken();
  }, []);

  if (!isInitialized) return <p>Chargement de l'utilisateur...</p>; // ⏳ attend init

  return <RouterProvider router={router} />;
}

export default App;
