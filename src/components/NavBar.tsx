import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { HomeIcon, ListTreeIcon, ShoppingCart } from "lucide-react";

export function NavBar() {
  const { isAuthenticated, user } = useAuth();
  return (
    <header className="flex justify-between backdrop-blur-lg">
      <div className="w-full flex justify-center gap-40 p-4">
        <div>
          <Link to="/" className="flex flex-row items-center gap-2">
            <HomeIcon />
            Home
          </Link>
        </div>
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
            <Link to="/profile">Profile</Link>
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
