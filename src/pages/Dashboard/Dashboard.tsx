import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";

export function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#FCFCFC] text-[#30292F]">
      <aside className="w-64 bg-[#02111B] text-[#FCFCFC] flex flex-col">
        <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
        <nav className="flex-1 space-y-4 p-4">
          <Link
            to="/dashboard"
            className="block p-2 rounded hover:bg-[#5D737E]"
          >
            Home
          </Link>
          <Link
            to="/dashboard/products"
            className="block p-2 rounded hover:bg-[#5D737E]"
          >
            Products
          </Link>
          <Link
            to="/dashboard/users"
            className="block p-2 rounded hover:bg-[#5D737E]"
          >
            Users
          </Link>
          <Link
            to="/dashboard/orders"
            className="block p-2 rounded hover:bg-[#5D737E]"
          >
            Orders
          </Link>
          <Link
            to="/dashboard/reports"
            className="block p-2 rounded hover:bg-[#5D737E]"
          >
            Reports
          </Link>
        </nav>
        <div className="flex flex-row justify-between items-center px-3 m-2">
          Hi {user?.name}
          <Button
            onClick={logout}
            variant="destructive"
            className="border-0 bg-transparent"
          >
            LogOut
          </Button>
        </div>

        {/* Hacer handle logout para el boton */}
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
