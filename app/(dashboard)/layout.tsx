import React from "react";
import Header from "@/app/components/Header"

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {children}
    </div>
  );
}

export default DashboardLayout;
