import Image from "next/image";

const Header = () => {
  return (
    <header className="h-16 md:h-28 flex items-center px-3 md:px-10 relative">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={70}
          className="object-contain"
        />

        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mx-auto">
          <Image src="/signal.svg" alt="Signal" width={40} height={40} />
        </div>

        <div className="ml-auto flex flex-col items-end leading-tight">
          <span className="text-sm md:text-base text-black font-semibold">नाम: Shivam</span>
          <span className="text-sm md:text-base text-black font-semibold">पढ़: Checker</span>
        </div>
      </header>
  )
}

export default Header;