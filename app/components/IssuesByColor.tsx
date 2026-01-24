"use client"

import { useRouter } from "next/navigation";

const IssuesByColor = () => {
  const router = useRouter();

  const goToColor = (color: string, size: string) => {
    router.push(`/qr-issue-by-single-color?color=${color}&size=${size}`);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white px-4 py-2 gap-3">
      <h1 className="text-blue-500 text-sm font-bold uppercase leading-snug">
        FREE EST BAG GOLDEN FLUFFY RED ORANGE WITH TRIMS
      </h1>

      <div className="w-full max-w-md bg-white rounded-md shadow-md border border-gray-300 overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="border-r border-gray-300 px-3 py-2 font-bold text-black text-left">
                Color
              </th>
              <th className="border-r border-gray-300 px-3 py-2 font-bold text-black text-center">
                Size
              </th>
              <th className="px-3 py-2 font-bold text-black text-center">
                Pieces
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray-300">
              <td
                onClick={() => goToColor("Red", "S")}
                className="border-r border-gray-300 px-3 py-2 text-blue-600 font-semibold cursor-pointer"
              >
                Red
              </td>
              <td className="border-r border-gray-300 px-3 py-2 text-center">
                S
              </td>
              <td className="px-3 py-2 text-center">50</td>
            </tr>

            <tr className="border-b border-gray-300">
              <td
                onClick={() => goToColor("Orange", "XL")}
                className="border-r border-gray-300 px-3 py-2 text-blue-600 font-semibold cursor-pointer"
              >
                Orange
              </td>
              <td className="border-r border-gray-300 px-3 py-2 text-center">
                XL
              </td>
              <td className="px-3 py-2 text-center">200</td>
            </tr>

            <tr className="border-b border-gray-300">
              <td
                onClick={() => goToColor("Blue", "M")}
                className="border-r border-gray-300 px-3 py-2 text-blue-600 font-semibold cursor-pointer"
              >
                Blue
              </td>
              <td className="border-r border-gray-300 px-3 py-2 text-center">
                M
              </td>
              <td className="px-3 py-2 text-center">1000</td>
            </tr>

            <tr>
              <td
                onClick={() => goToColor("Pink", "L")}
                className="border-r border-gray-300 px-3 py-2 text-blue-600 font-semibold cursor-pointer"
              >
                Pink
              </td>
              <td className="border-r border-gray-300 px-3 py-2 text-center">
                L
              </td>
              <td className="px-3 py-2 text-center">250</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuesByColor;
