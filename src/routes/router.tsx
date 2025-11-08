import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../AppLayout";
import Home from "../pages/Home/Home";
import Category from "../pages/Category/Category";
import Categorydetail from "../pages/Category/Categorydetail";
import Productdetail from "../pages/Product/Productdetail";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Profile from "../pages/Profile/Profile";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import Notfound from "../pages/NotFound/Notfound";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Notfound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/category", element: <Category /> },
      { path: "/category/:slug", element: <Categorydetail /> },
      { path: "/producto/:id", element: <Productdetail /> },
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
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
