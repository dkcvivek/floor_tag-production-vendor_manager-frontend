"use client";

import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";

export default function SeeReportsPage() {
  const router =useRouter();
  return (
    <>
      <Navbar title="REPORTS" />

      <div className="mx-auto w-full max-w-107.5 bg-gray-50 px-4 pt-4 pb-20">
        <div className="mb-4">
          <h1 className="text-sm font-extrabold uppercase leading-snug text-blue-700">
            FREE EST BAG GOLDEN FLUFFY RED ORANGE WITH TRIMS
          </h1>
        </div>

        <div className="rounded-xl border border-gray-300 bg-white p-4 space-y-3 text-sm">
          <InfoRow label="VENDOR" value="NS" />
          <InfoRow label="ORDER QUANTITY" value="1300" />

          <div className="pt-2 border-t border-gray-200">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-1">
              PERIOD
            </p>
            <div className="text-gray-700 text-xs space-y-0.5">
              <div>19th January 2026 · 11:15 am</div>
              <div>19th January 2026 · 11:30 am</div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-gray-300 bg-white overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-xs font-semibold text-gray-600">
              QUALITY CHECK REPORT
            </p>
          </div>

          <table className="w-full text-xs border-collapse">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-2 py-2 border-r border-gray-300 text-center w-10">
                  #
                </th>
                <th className="px-2 py-2 border-r border-gray-300 text-left">
                  WHAT TO CHECK
                </th>
                <th className="px-2 py-2 border-r border-gray-300 text-center text-green-600 w-16">
                  PASS
                </th>
                <th className="px-2 py-2 text-center text-red-600 w-16">
                  FAIL
                </th>
              </tr>
            </thead>

            <tbody>
              {[
                ["1", "No bubbling", "12", "1"],
                ["2", "Packaging", "9", "0"],
                ["3", "Labeling", "4", "0"],
                ["4", "Transporting", "0", "0"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-200 even:bg-gray-50"
                  onClick={()=> router.push("/single-report")}
                >
                  <td className="px-2 py-2 border-r border-gray-200 text-center text-gray-500">
                    {row[0]}
                  </td>

                  <td className="px-2 py-2 border-r border-gray-200 text-gray-700 font-medium">
                    {row[1]}
                  </td>

                  <td className="px-2 py-2 border-r border-gray-200 text-center">
                    <Badge value={row[2]} />
                  </td>

                  <td className="px-2 py-2 text-center">
                    <Badge value={row[3]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-[11px] font-semibold uppercase text-gray-500">
      {label}
    </span>
    <span className="text-sm font-bold text-gray-800 text-right">{value}</span>
  </div>
);

const Badge = ({ value }: { value: string }) => (
  <span className="inline-flex min-w-8.5 justify-center rounded-md bg-blue-600 px-2 py-1 text-xs font-extrabold text-white">
    {value}
  </span>
);
