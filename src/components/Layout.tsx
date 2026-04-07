import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FAQ from "./FAQ";
import FloatingDeity from "./FloatingDeity";
import StickyActions from "./StickyActions";
import BackgroundMusic from "./BackgroundMusic";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Header />
      <main>{children}</main>
      <FAQ />
      <Footer />
      <FloatingDeity />
      <StickyActions />
      <BackgroundMusic />
    </div>
  );
};

export default Layout;
