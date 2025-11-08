import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import Footer from "./components/Footer";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col text-[#30292F] bg-[#5D737E]">
      <NavBar />
      <main className="container mx-auto flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
