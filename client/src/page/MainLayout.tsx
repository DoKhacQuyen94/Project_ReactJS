import { Outlet } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

export default function MainLayout({
  management_nav,
}: {
  management_nav: string;
}) {
  return (
    <div>
      <Navbar type={management_nav} />
      <main className="h-[85vh] bg-white">
        <Outlet /> {/* render Home */}
      </main>
      <Footer></Footer>
    </div>
  );
}
