import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}

export default Layout;
