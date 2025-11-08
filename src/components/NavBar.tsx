import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function NavBar() {
  const { isAuthenticated, user } = useAuth();
  return (
    <header className="flex justify-between backdrop-blur-lg">
      <div className="w-full flex justify-center gap-40 p-4">
        <Link to="/">Tienda</Link>
        <Link to="/category">Categorías</Link>
        <Link to="/cart">Carrito</Link>
      </div>
      <div className="p-4 mr-5">
        {isAuthenticated ? (
          <>
            <Link to="/profile">Perfil</Link>
            <span className="">Hola {user?.name}</span>
          </>
        ) : (
          <Link className="" to="/login">
            Ingresar
          </Link>
        )}
      </div>
    </header>
  );
}
