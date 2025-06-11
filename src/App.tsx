/* eslint-disable react-hooks/exhaustive-deps */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ConnectedRoute from "./components/ConnectedRoute";
import UnconnectedRoute from "./components/UnconnectedRoute";
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
          <UnconnectedRoute>
            <Login />
          </UnconnectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <UnconnectedRoute>
            <Register />
          </UnconnectedRoute>
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

  useEffect(() => {
    initUserFromToken();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
