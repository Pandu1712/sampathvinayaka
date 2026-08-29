import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FAQ from "./FAQ";
import FloatingDeity from "./FloatingDeity";
import StickyActions from "./StickyActions";
import EventPopup from "./EventPopup";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <Header />
      <main className="pt-[88px] sm:pt-[96px]">{children}</main>
      <FAQ />
      <Footer />
      <FloatingDeity />
      <StickyActions />
      <EventPopup />
    </div>
  );
};

export default Layout;
