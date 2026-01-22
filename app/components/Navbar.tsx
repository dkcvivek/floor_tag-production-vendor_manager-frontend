"use client";

import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type NavbarProps = {
  title: string;
};

const Navbar = ({ title }: NavbarProps) => {
  const router = useRouter();

  return (
    <header className="sticky top-16 h-14 bg-[#1E90FF] flex items-center px-3 text-white">
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} />
        <span className="text-xs font-medium">BACK</span>
      </div>

      <h1 className="flex-1 text-center text-sm font-semibold tracking-wide">
        {title}
      </h1>

      <Link href="/">
        <Home size={18} />
      </Link>
    </header>
  );
};

export default Navbar;
