import { ReactNode } from "react";
import Navbar from "@/app/components/Navbar"

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <main className="pt-16">
        <Navbar />
        {children}
      </main>
    </div>
  );
}

export default Layout;
