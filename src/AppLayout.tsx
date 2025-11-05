import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export default function AppLayout() {
  const { isAuthenticated, user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="container mx-auto flex items-center gap-4 p-4">
          <Link className="font-semibold" to="/">Tienda</Link>
          <Link to="/categorias">Categorías</Link>
          <Link to="/carrito">Carrito</Link>
          {isAuthenticated ? (
            <>
              <Link to="/perfil">Perfil</Link>
              <span className="ml-auto text-sm opacity-70">Hola {user?.name}</span>
            </>
          ) : (
            <Link className="ml-auto" to="/ingresar">Ingresar</Link>
          )}
        </nav>
      </header>
      <main className="container mx-auto flex-1 p-4">
        <Outlet />
      </main>
      <footer className="border-t text-center p-4 text-sm opacity-70">
        © {new Date().getFullYear()} Suplementos – Frontend
      </footer>
    </div>
  );
}
