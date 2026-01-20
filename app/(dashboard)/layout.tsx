import React from "react";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}

export default DashboardLayout;
