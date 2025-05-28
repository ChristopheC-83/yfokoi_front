import useViewport from "@/hooks/useIsDesktop";
import Footer from "./Footer";
import Header from "./Header";
import DesktopLists from "./desktop/DesktopLists";
import DesktopContent from "./desktop/DesktopContent";
import DesktopSharing from "./desktop/DesktopSharing";
import DesktopFriends from "./desktop/DesktopFriends";

export default function Layout() {
  const viewport = useViewport();

  console.log("viewport", viewport);

  return (
    <div className="min-h-svh bg-slate-800 flex flex-col ">
      <Header />
      <main className="grow flex">
        {(viewport === "desktop" || viewport === "tablet") && <DesktopLists /> }
        {(viewport === "desktop" || viewport === "tablet") && <DesktopContent /> }
        {viewport === "desktop" && (
          <section className="flex flex-col">
            <DesktopSharing />
            <DesktopFriends />
          </section>
        ) }
      </main>
      <Footer />
    </div>
  );
}
