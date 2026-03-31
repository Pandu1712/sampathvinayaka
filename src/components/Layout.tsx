import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FAQ from "./FAQ";
import FloatingDeity from "./FloatingDeity";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Header />
      <main>{children}</main>
      <FAQ />
      <Footer />
      <FloatingDeity />
    </div>
  );
};

export default Layout;
