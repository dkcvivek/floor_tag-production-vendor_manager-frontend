"use client";

import Navbar from "@/app/components/Navbar";

export default function SeeReportsPage() {
  return (
    <>
      <Navbar title="REPORTS" />

      <div className="mx-auto w-full max-w-[430px] bg-gray-50 px-4 pt-4 pb-[80px] space-y-4">
        <h1 className="text-sm font-extrabold uppercase leading-snug text-blue-700">
          FREE EST BAG GOLDEN FLUFFY RED ORANGE WITH TRIMS
        </h1>

        <div className="rounded-xl bg-white p-4 shadow-sm space-y-3">
          <InfoRow label="Vendor" value="NS" />
          <InfoRow label="Order Quantity" value="1300" />

          <div className="pt-3 border-t border-gray-100">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
              Period
            </p>
            <div className="text-xs text-gray-700 space-y-0.5">
              <div>19 Jan 2026 · 11:15 AM</div>
              <div>19 Jan 2026 · 11:30 AM</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Quality Check Report
            </p>
          </div>

          <table className="w-full text-xs border-collapse">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-3 py-2 text-center w-10 border-r border-gray-200">
                  #
                </th>
                <th className="px-3 py-2 text-left border-r border-gray-200">
                  Check
                </th>
                <th className="px-3 py-2 text-center w-16 border-r border-gray-200">
                  Pass
                </th>
                <th className="px-3 py-2 text-center w-16">Fail</th>
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
                >
                  <td className="px-3 py-2 text-center text-gray-400 border-r border-gray-200">
                    {row[0]}
                  </td>

                  <td className="px-3 py-2 font-medium text-gray-800 border-r border-gray-200">
                    {row[1]}
                  </td>

                  <td className="px-3 py-2 text-center border-r border-gray-200">
                    <Pill type="pass" value={row[2]} />
                  </td>

                  <td className="px-3 py-2 text-center">
                    <Pill type="fail" value={row[3]} />
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
    <span className="text-[11px] font-semibold uppercase text-gray-400">
      {label}
    </span>
    <span className="text-sm font-bold text-gray-800 text-right">{value}</span>
  </div>
);

const Pill = ({ value, type }: { value: string; type: "pass" | "fail" }) => (
  <span
    className={`inline-flex min-w-[34px] justify-center rounded-md px-2 py-1 text-xs font-bold
      ${
        type === "pass"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
  >
    {value}
  </span>
);
