import Web3Dashboard from "@/pages/Web3Dashboard";
import Dashboard from "@/pages/Dashboard";
import Assets from "@/pages/Assets";
import Holdings from "@/pages/Holdings";
import Orders from "@/pages/Orders";

export const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/assets",
    element: <Assets />,
  },
  {
    path: "/holdings",
    element: <Holdings />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/web3",
    element: <Web3Dashboard />,
  },
];
