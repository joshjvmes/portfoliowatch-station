import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import WalletManagement from "@/pages/WalletManagement";
import JupiterExchange from "@/pages/JupiterExchange";
import PrivateRoute from "@/components/auth/PrivateRoute";

export const routes = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/wallet",
    element: (
      <PrivateRoute>
        <WalletManagement />
      </PrivateRoute>
    ),
  },
  {
    path: "/jupiter",
    element: (
      <PrivateRoute>
        <JupiterExchange />
      </PrivateRoute>
    ),
  },
];

export default routes;