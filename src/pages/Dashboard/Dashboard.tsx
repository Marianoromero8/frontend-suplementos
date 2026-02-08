import { Link, Outlet } from "react-router-dom";
import {
  FileChartColumn,
  HomeIcon,
  ListTreeIcon,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Star,
  UserIcon,
  Users,
} from "lucide-react";

export function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#FCFCFC] text-[#30292F]">
      <aside className="w-64 bg-[#02111B] text-[#FCFCFC] flex flex-col">
        <div className="p-4 text-2xl font-bold">Dashboard Administrador</div>
        <nav className="flex-1 space-y-4 p-4">
          <Link
            to="/dashboard"
            className="flex flex-row gap-2 p-2 rounded hover:bg-[#5D737E]"
          >
            <HomeIcon />
            Home
          </Link>
          <Link
            to="/dashboard/products"
            className="flex flex-row gap-2 p-2 rounded hover:bg-[#5D737E]"
          >
            <ShoppingBag />
            Productos
          </Link>
          <Link
            to="/dashboard/users"
            className="flex flex-row gap-2 p-2 rounded hover:bg-[#5D737E]"
          >
            <Users />
            Usuarios
          </Link>
          <Link
            to="/dashboard/categories"
            className="flex flex-row gap-2 p-2 rounded hover:bg-[#5D737E]"
          >
            <ListTreeIcon />
            Categorias
          </Link>
          <Link
            to="/dashboard/orders"
            className="flex flex-row gap-2 p-2 rounded hover:bg-[#5D737E]"
          >
            <ShoppingCart />
            Ordenes
          </Link>
          <Link
            to="/dashboard/reviews"
            className="flex flex-row gap-2 p-2 rounded hover:bg-[#5D737E]"
          >
            <Star />
            Reviews
          </Link>
          <Link
            to="/dashboard/reports"
            className="flex flex-row gap-2 p-2 rounded hover:bg-[#5D737E]"
          >
            <FileChartColumn />
            Reportes
          </Link>
          <Link
            to="/"
            className="flex flex-row gap-2 p-2 rounded hover:bg-[#5D737E]"
          >
            <ShoppingBasket />
            Tienda
          </Link>
          <Link
            to="/profile"
            className="flex flex-row gap-2 p-2 rounded hover:bg-[#5D737E]"
          >
            <UserIcon />
            Perfil
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
