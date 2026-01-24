import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-40 h-16 w-full flex items-center px-4 bg-gray-200">
      <div className="shrink-0">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={80}
          height={40}
          className="object-contain"
        />
      </div>

      <div className="flex-1 flex justify-center">
        <Image
          src="/signal.svg"
          alt="Signal"
          width={32}
          height={32}
        />
      </div>

      <div className="shrink-0 text-left leading-tight">
        <span className="block text-sm font-medium text-gray-800">
          नाम: Arjit
        </span>
        <span className="block text-sm font-medium text-gray-800">
          पढ़: Manager
        </span>
      </div>
    </header>
  );
};

export default Header;
