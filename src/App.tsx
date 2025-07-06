/* eslint-disable react-hooks/exhaustive-deps */
// App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { useAuthStore } from "./stores/users/useAuthStore";
import Contact from "./pages/Contact";
import Layout from "./components/layout/Layout";
import NoConnectedRoute from "./components/layout/NoConnectedRoute";
import ConnectedRoute from "./components/layout/ConnectedRoute";

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
      {
        path: "contact",
        element: (
            <Contact />
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

  if (!isInitialized) return <p>Chargement de l'utilisateur...</p>; 

  return <RouterProvider router={router} />;
}

export default App;
