import { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <main className="pt-16">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
}

export default Layout;
