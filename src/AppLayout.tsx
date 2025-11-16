import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import Footer from "./components/Footer";

export default function AppLayout() {
  const location = useLocation();

  const hideNavAndFooterRoutes = [
    "/login",
    "/register",
    "/notfound",
    "/dashboard",
  ];

  const dashboardRoutes = location.pathname.startsWith("/dashboard");
  const shouldHide = hideNavAndFooterRoutes.includes(location.pathname);

  const toHide = dashboardRoutes || shouldHide;
  return (
    <div className="min-h-screen flex flex-col text-[#30292F] bg-[#5D737E]">
      {!toHide && <NavBar />}
      <main className="container mx-auto flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
