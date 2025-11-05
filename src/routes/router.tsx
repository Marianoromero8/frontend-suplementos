import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../AppLayout";
import Home from "../pages/Home";
import Category from "../pages/Category";
import Categorydetail from "../pages/Categorydetail";
import Productdetail from "../pages/Productdetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Notfound from "../pages/Notfound";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Notfound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/categorias", element: <Category /> },
      { path: "/categoria/:slug", element: <Categorydetail /> },
      { path: "/producto/:id", element: <Productdetail /> },
      { path: "/carrito", element: <Cart /> },
      { path: "/checkout", element: <RequireAuth><Checkout /></RequireAuth> },
      { path: "/perfil", element: <RequireAuth><Profile /></RequireAuth> },
      { path: "/ingresar", element: <Login /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
