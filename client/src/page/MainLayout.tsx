import { Outlet } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

export default function MainLayout({
  management_nav,
}: {
  management_nav: string;
}) {
  return (
    <div className={"height-[100vh] bg-white-600"}>
      <Navbar type={management_nav} />
      <main className="max-h-[100%] min-h-[85vh] bg-white">
        <Outlet /> {/* render Home */}
      </main>
      <Footer></Footer>
    </div>
  );
}
