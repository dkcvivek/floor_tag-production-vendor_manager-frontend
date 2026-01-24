"use client";

import { QrCode } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40">
      <Link href="/scan"
        aria-label="Scan QR"
        className="h-14 w-full bg-[#1E90FF] flex items-center justify-center active:opacity-90 pb-[env(safe-area-inset-bottom)]"
      >
        <QrCode size={28} className="text-white" />
      </Link>
    </footer>
  );
}

export default Footer;
