import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <div className="min-h-svh bg-slate-800 text-amber-100 flex flex-col ">
      <Header />
      <main className="grow flex">
        
            <Toaster position="top-center" richColors expand={true} />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
