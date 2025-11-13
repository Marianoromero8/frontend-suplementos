import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <aside className="w-fit bg-[#02111B] text-white flex flex-col">
        <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
        <nav className="flex-1 space-y-2 p-4">
          <Link
            to="/dashboard"
            className="block p-2 rounded hover:bg-[#5D737E]"
          >
            Home
          </Link>
          <Link to="products" className="block p-2 rounded hover:bg-[#5D737E]">
            Products
          </Link>
          <Link to="users" className="block p-2 rounded hover:bg-[#5D737E]">
            Users
          </Link>
          <Link to="orders" className="block p-2 rounded hover:bg-[#5D737E]">
            Sells
          </Link>
          <Link to="reports" className="block p-2 rounded hover:bg-[#5D737E]">
            Reports
          </Link>
        </nav>

        <div className="flex flex-row justify-center border rounded-4xl m-2">
          Hi {user?.name}
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
