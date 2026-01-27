"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      className="
        min-h-dvh w-screen
        bg-linear-to-br from-blue-600 to-blue-800
        flex items-center justify-center
        px-4 overflow-hidden
      "
    >
      <div className="relative max-w-md w-full text-center text-white">
        <h1 className="absolute inset-0 flex items-center justify-center 
                       text-[160px] sm:text-[200px] font-extrabold 
                       text-white/10 select-none">
          404
        </h1>

        <div className="relative z-10 flex flex-col items-center">

          <div className="relative w-96 h-96 ml-1">
            <Image
              src="/images/404-2.png"
              alt="404 illustration"
              fill
              priority
              className="object-contain"
            />
          </div>

          <p className="text-lg mb-6 text-white/90 -mt-11">
            Awww...Don't cry it's just a 404 Error!
          </p>

          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-full 
                       bg-white text-blue-700 font-semibold
                       hover:bg-blue-100 transition-all duration-200
                       text-sm sm:text-base"
          >
            Go to homepage
          </button>
        </div>
      </div>
    </div>
  );
}
