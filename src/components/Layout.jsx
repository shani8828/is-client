import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Header />
      <ScrollToTop />
      <main className="flex-grow">
        {/* Outlet renders the child routes (HomePage, About, etc.) */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;