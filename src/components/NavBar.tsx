import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  LayoutDashboardIcon,
  ListTreeIcon,
  ShoppingCart,
  UserCheck,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";

export function NavBar() {
  const { isAuthenticated, isAdmin, logout, loading } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-bold text-xl md:hidden">Suplementos</div>

        <nav className="hidden md:flex items-center justify-center flex-1 gap-8">
          {loading ? (
            <Skeleton className="h-6 w-24" />
          ) : (
            isAdmin && (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 hover:opacity-70 transition"
              >
                <LayoutDashboardIcon size={20} />
                <span>Dashboard</span>
              </Link>
            )
          )}

          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            <HomeIcon size={20} />
            <span>Home</span>
          </Link>

          <Link
            to="/categories"
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            <ListTreeIcon size={20} />
            <span>Categorias</span>
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2 relative hover:opacity-70 transition"
          >
            <ShoppingCart size={20} />
            <span>Carrito</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          {loading ? (
            <Skeleton className="h-6 w-32" />
          ) : isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:opacity-70 transition"
              >
                <UserCheck size={20} />
                <span>Perfil</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-[#220504ec] hover:text-[#b42c2cf3] transition"
              >
                <LogOut size={18} />
                <span>Cerrar Sesion</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:underline font-medium">
              Iniciar Sesion
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative p-2">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff140cec] text-[10px] text-[#ffff]">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={toggleMenu} className="p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#ffff] border-b shadow-lg animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4 gap-4">
            {isAdmin && (
              <Link
                to="/dashboard"
                onClick={toggleMenu}
                className="flex items-center gap-3 p-2"
              >
                <LayoutDashboardIcon /> Dashboard
              </Link>
            )}
            <Link
              to="/"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-2"
            >
              <HomeIcon /> Home
            </Link>
            <Link
              to="/categories"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-2"
            >
              <ListTreeIcon /> Categorias
            </Link>
            <hr />
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 p-2"
                >
                  <UserCheck /> Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-2 bg-[#e7231cec] font-medium"
                >
                  <LogOut size={20} /> Cerrar Sesion
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={toggleMenu}
                className="p-2 font-bold text-center bg-[#ffffffe5] rounded-lg"
              >
                Iniciar Sesion
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
