"use client";

import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import Navbar from "@/app/components/Navbar";
import ConnectorBox from "./ConnectorBox";
import { StatesData } from "../types/types";

const Page = ({ isIssue=false }: { isIssue?: boolean }) => {
  const searchParams = useSearchParams();

  const color = searchParams.get("color") || "RED";
  const size = searchParams.get("size") || "L";
  const code = searchParams.get("code") || "HKHAPJEWP";

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

  const boxColor = colorMap[color.toLowerCase()] || "#3b82f6";

  const statesData: StatesData = {
    styleName: "Style-A",
    qrCode: "QR123456",
    size: "M",
    stages: [
      { id: 1, name: "Cutting", status: "PASSED" },
      { id: 2, name: "Stitching", status: "PASSED" },
      { id: 3, name: "Washing", status: "PASSED" },
      { id: 4, name: "Cutting", status: "PASSED" },
      { id: 5, name: "Stitching", status: "PASSED" },
      { id: 6, name: "Washing", status: "PASSED" },
      { id: 7, name: "Cutting", status: "PASSED" },
      { id: 8, name: "Stitching", status: "PASSED" },
      { id: 9, name: "Washing", status: "PASSED" },
      { id: 10, name: "QC", status: "FAILED" },
      { id: 11, name: "Cutting", status: "PASSED" },
      { id: 12, name: "Stitching", status: "PASSED" },
      { id: 13, name: "Washing", status: "PASSED" },
      { id: 14, name: "QC", status: "FAILED" },
      { id: 15, name: "Washing", status: "PASSED" },
    ],
  };

  return (
    <>
      <Navbar title="QR ISSUES" />

      <div className="mx-auto max-w-md min-h-screen bg-white px-4 py-3 flex flex-col gap-4">
        <h1 className="text-blue-600 text-sm font-bold uppercase leading-snug">
          FREE EST BAG GOLDEN FLUFFY RED ORANGE WITH TRIMS
        </h1>

        <div className="flex justify-end text-sm font-semibold text-gray-700">
          SIZE: {size}
        </div>

        <div className="text-center font-bold text-base tracking-wide">
          {code}
        </div>

        {isIssue ? (
          <>
            <div className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
              <span className="font-semibold text-red-700">STATUS: </span>Issue
            </div>

            <div className="rounded-lg border border-gray-200 px-3 py-2 text-sm"> 
              <span className="font-semibold">TYPE: </span>Lorem, ipsum dolor.
            </div>

            <div className="rounded-lg border border-gray-200 text-sm">
              <div className="font-semibold p-2 border-b border-gray-200">REASON: </div>

              <div className="px-3 py-2">
                Lorem ipsum dolor, sit amet consectetur
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
            <span className="font-semibold text-green-700">STATUS:</span> No
            Issue
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="mb-4 text-sm font-bold text-gray-700 text-center">
            ORDER PROGRESS
          </p>

          <div className="flex justify-center">
            <div className="w-fit max-w-full">
              <ConnectorBox data={statesData.stages} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b bg-gray-50 px-4 py-2 text-sm font-bold text-gray-700">
            SCAN HISTORY
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">#</th>
                <th className="px-4 py-3 text-left font-semibold">Code</th>
                <th className="px-4 py-3 text-left font-semibold">Time</th>
                <th className="px-4 py-3 text-left font-semibold">Process</th>
                <th className="px-4 py-3 text-right font-semibold">Result</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((i) => (
                <tr
                  key={i}
                  className="border-t even:bg-gray-50 hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-3">{i}</td>
                  <td className="px-4 py-3 font-medium">HK{i}XYZ</td>
                  <td className="px-4 py-3 text-gray-600">10:2{i} AM</td>
                  <td className="px-4 py-3">Scan</td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      PASS
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-1 text-sm font-bold">COLOR / PRINT</p>
        <div
          className="h-28 w-full rounded-xl border shadow-sm mb-16"
          style={{ backgroundColor: boxColor }}
        />
      </div>
    </>
  );
};

export default Page;
