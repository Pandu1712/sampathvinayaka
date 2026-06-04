import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FAQ from "./FAQ";
import FloatingDeity from "./FloatingDeity";
import StickyActions from "./StickyActions";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <Header />
      <main className="pt-[96px] sm:pt-[112px]">{children}</main>
      <FAQ />
      <Footer />
      <FloatingDeity />
      <StickyActions />
    </div>
  );
};

export default Layout;
