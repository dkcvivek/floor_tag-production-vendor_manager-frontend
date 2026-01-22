import { ReactNode } from "react";
import SubHeader from "../components/SubHeader";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <main className="pt-16">
        <SubHeader header="CREATE CHECKER ACCOUNT"/>
        {children}
      </main>
    </div>
  );
}

export default Layout;
