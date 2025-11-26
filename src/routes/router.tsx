import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../AppLayout";
import { Home } from "../pages/Home/Home";
import { Category } from "../pages/Category/Category";
import { Productdetail } from "../pages/Product/Productdetail";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Profile from "../pages/Profile/Profile";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import Notfound from "../pages/NotFound/Notfound";
import RequireAuth from "./RequireAuth";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Categorydetail } from "@/pages/Category/Categorydetail";
import { DashboardHome } from "@/pages/Dashboard/Home/DashboardHome";
import { DashboardProducts } from "@/pages/Dashboard/components/Products/DashboardProducts";
import { DashboardUsers } from "@/pages/Dashboard/components/Users/DashboardUsers";
import { DashboardOrders } from "@/pages/Dashboard/components/Orders/DashboardOrders";
import { DashboardReports } from "@/pages/Dashboard/components/Reports/DashboardReports";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Notfound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/categories", element: <Category /> },
      { path: "/categories/:id", element: <Categorydetail /> },
      { path: "/product/:id", element: <Productdetail /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/checkout",
        element: (
          <RequireAuth>
            <Checkout />
          </RequireAuth>
        ),
      },
      {
        path: "/profile",
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "products", element: <DashboardProducts /> },
          { path: "users", element: <DashboardUsers /> },
          { path: "orders", element: <DashboardOrders /> },
          { path: "reports", element: <DashboardReports /> },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
