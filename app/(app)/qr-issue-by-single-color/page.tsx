"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";

const page = () => {
  const router= useRouter();
  const searchParams = useSearchParams();
  const color = searchParams.get("color") || "RED";
  const size = searchParams.get("size") || "L";

  const colorMap: Record<string, string> = {
    red: "#ef4444",
    orange: "#f97316",
    blue: "#3b82f6",
    pink: "#ec4899",
    green: "#22c55e",
    yellow: "#eab308",
    black: "#000000",
    white: "#ffffff",
    purple: "#a855f7",
    brown: "#92400e",
    gray: "#6b7280",
  };

  const boxColor =
    colorMap[color.toLowerCase()] || "#0f766e";

  return (
    <>
      <Navbar title="QR ISSUES" />

      <div className="flex flex-col min-h-screen bg-white px-4 py-2 gap-3">
        <h1 className="text-blue-500 text-sm font-bold uppercase leading-snug">
          FREE EST BAG GOLDEN FLUFFY RED ORANGE WITH TRIMS
        </h1>

        <div className="flex justify-between text-sm font-bold">
          <span>COLOR: {color}</span>
          <span>SIZE: {size}</span>
        </div>

        <div className="w-full max-w-md bg-white rounded-md shadow-md border border-gray-300 overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="border-r border-gray-300 px-3 py-2 font-bold">
                  S. No
                </th>
                <th className="border-r border-gray-300 px-3 py-2 font-bold">
                  QR Code
                </th>
                <th className="px-3 py-2 font-bold">Action</th>
              </tr>
            </thead>

            <tbody>
              {["HKYWGDF", "USKXFDDW", "ISEJYHJY", "EYFWCDG"].map(
                (code, index) => (
                  <tr key={code} className="border-b border-gray-300">
                    <td className="border-r border-gray-300 px-3 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border-r border-gray-300 px-3 py-2 text-center">
                      {code}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md active:scale-95" onClick={()=> router.push(`/piece-detail?code=${code}`)}>
                        OPEN
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <p className="font-bold text-sm mt-2">COLOR/PRINT</p>

        <div
          className="w-full h-28 rounded-md border border-gray-300 shadow-inner"
          style={{ backgroundColor: boxColor }}
        />
      </div>
    </>
  );
};

export default page;
