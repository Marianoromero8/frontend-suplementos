import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  LayoutDashboardIcon,
  ListTreeIcon,
  ShoppingCart,
  UserCheck,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Skeleton } from "./ui/skeleton";

export function NavBar() {
  const { isAuthenticated, isAdmin, logout, loading } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex justify-between backdrop-blur-lg">
      <div className="w-full flex justify-center gap-40 p-4">
        {loading ? (
          <Skeleton className="h-6 w-24" />
        ) : (
          isAdmin && (
            <Link to="/dashboard" className="flex flex-row items-center gap-2">
              <LayoutDashboardIcon />
              Dashboard
            </Link>
          )
        )}

        {loading ? (
          <Skeleton className="h-6 w-24" />
        ) : (
          <>
            <Link to="/" className="flex flex-row items-center gap-2">
              <HomeIcon />
              Home
            </Link>

            <Link to="/categories" className="flex flex-row items-center gap-2">
              <ListTreeIcon />
              Categorias
            </Link>

            <Link
              to="/cart"
              className="flex flex-row items-center gap-2 relative"
            >
              <ShoppingCart />
              <span>Carrito</span>
              {totalItems > 0 && (
                <span className="ml-1 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold bg-black/80 text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </>
        )}
      </div>

      <div className="p-4 mr-5 flex items-center gap-4">
        {loading ? (
          <div className="flex gap-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
        ) : isAuthenticated ? (
          <>
            <Link to="/profile" className="flex flex-row items-center gap-2">
              <UserCheck />
              Perfil
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[#d11f1f] hover:text-[#9b3434] transition whitespace-nowrap"
            >
              <LogOut size={18} />
              Cerrar Sesion
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline whitespace-nowrap">
            Iniciar Sesion
          </Link>
        )}
      </div>
    </header>
  );
}
