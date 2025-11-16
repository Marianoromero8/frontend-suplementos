import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#FCFCFC] text-[#30292F]">
      <aside className="w-fit bg-[#02111B] text-[#FCFCFC] flex flex-col">
        <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
        <nav className="flex-1 space-y-4 p-4">
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

        {/* Hacer handle logout para el boton */}
        <div className="flex flex-row justify-between items-center px-3 m-2">
          Hi {user?.name}
          <Button variant="destructive" className="border-0 bg-transparent">
            LogOut
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
