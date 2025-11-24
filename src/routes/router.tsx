import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../AppLayout";
import Home from "../pages/Home/Home";
import Category from "../pages/Category/Category";
import Productdetail from "../pages/Product/Productdetail";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Profile from "../pages/Profile/Profile";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import Notfound from "../pages/NotFound/Notfound";
import RequireAuth from "./RequireAuth";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import CategoryDetail from "@/pages/Category/Categorydetail";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Notfound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/categories", element: <Category /> },
      { path: "/categories/:id", element: <CategoryDetail /> },
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
          { index: true, element: <h1>Dashboard Home</h1> },
          { path: "products", element: <h1>Products</h1> },
          { path: "users", element: <h1>Users</h1> },
          { path: "orders", element: <h1>Sells</h1> },
          { path: "reports", element: <h1>Reports</h1> },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
