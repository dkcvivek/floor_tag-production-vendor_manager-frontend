import { ArrowLeft, Home } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-16 h-14 bg-[#1E90FF] flex items-center px-3 text-white">
        <div className="flex items-center gap-1">
          <ArrowLeft size={18} />
          <span className="text-xs font-medium">BACK</span>
        </div>

        <h1 className="flex-1 text-center text-sm font-semibold tracking-wide">
          QR ASSIGNMENT PROCESS
        </h1>

        <Home size={18} />
      </header>
  )
}

export default Navbar;