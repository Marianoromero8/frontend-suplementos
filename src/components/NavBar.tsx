import { Link } from "react-router-dom";
import {
  HomeIcon,
  LayoutDashboardIcon,
  ListTreeIcon,
  ShoppingCart,
  UserCheck,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function NavBar() {
  const { isAuthenticated, user, isAdmin } = useAuth();
  return (
    <header className="flex justify-between backdrop-blur-lg">
      <div className="w-full flex justify-center gap-40 p-4">
        {isAdmin && (
          <Link to="/dashboard" className="flex flex-row items-center gap-2">
            <LayoutDashboardIcon />
            Dashboard
          </Link>
        )}
        <Link to="/" className="flex flex-row items-center gap-2">
          <HomeIcon />
          Home
        </Link>
        <Link to="/categories" className="flex flex-row items-center gap-2">
          <ListTreeIcon />
          Categoríes
        </Link>
        <Link to="/cart" className="flex flex-row items-center gap-2">
          <ShoppingCart />
          Cart
        </Link>
      </div>
      <div className="p-4 mr-5">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="flex flex-row items-center gap-2">
              <UserCheck />
              Profile
            </Link>
            <span className="">Hi {user?.name}</span>
          </>
        ) : (
          <Link className="" to="/login">
            LogIn
          </Link>
        )}
      </div>
    </header>
  );
}
