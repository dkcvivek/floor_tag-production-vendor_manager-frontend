"use client";

import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";

type Slot = {
  time: string;
  value: number;
};

const slots: Slot[] = [
  { time: "11:00 am", value: 0 },
  { time: "11:15 am", value: 12 },
  { time: "11:30 am", value: 25 },
  { time: "11:45 am", value: 38 },

  { time: "10:00 am", value: 0 },
  { time: "10:15 am", value: 0 },
  { time: "10:30 am", value: 0 },
  { time: "10:45 am", value: 0 },

  { time: "9:00 am", value: 0 },
  { time: "9:15 am", value: 0 },
  { time: "9:30 am", value: 0 },
  { time: "9:45 am", value: 0 },
];

export default function Page() {
  const router= useRouter();

  return (
    <>
      <Navbar title="QR ISSUES" />

      <div className="mx-auto w-full max-w-107.5 bg-gray-50 px-4 pt-4 pb-20">
        
        <div className="rounded-xl border border-gray-300 bg-white p-4">
          <h1 className="text-[13px] font-extrabold uppercase text-blue-700 leading-snug">
            FREE EST BAG GOLDEN FLUFFY RED ORANGE WITH TRIMS
          </h1>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <InfoCard label="VENDOR" value="NS" />
            <InfoCard label="FIRST SCAN" value="19 Jan 2026 · 11:05" />
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-gray-300 bg-white p-4">
          <label className="mb-2 block text-xs font-semibold text-gray-600">
            DURATION
          </label>

          <div className="relative">
            <select
              className="
                w-full appearance-none rounded-lg border border-gray-300
                bg-white px-4 py-3 text-sm font-semibold text-gray-800
                focus:border-blue-500 focus:ring-1 focus:ring-blue-200
              "
            >
              <option>15 min</option>
              <option>30 min</option>
              <option>1 hour</option>
              <option>4 hours</option>
              <option>1 day</option>
            </select>

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              ▼
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-gray-300 bg-white p-4">
          <p className="mb-3 text-xs font-semibold text-gray-600">
            TIME SLOTS
          </p>

          <div className="grid grid-cols-4 gap-3">
            {slots.map((slot, i) => (
              <button
                key={i}
                onClick={() => router.push("/single-report")}
                className="
                  h-21 rounded-lg border border-gray-300 bg-gray-50
                  px-2 py-2 flex flex-col items-center justify-between
                  active:bg-gray-100
                "
              >
                <span className="text-[11px] font-semibold text-gray-700">
                  {slot.time}
                </span>

                <span
                  className={`
                    flex h-9 min-w-9 items-center justify-center
                    rounded-md text-xs font-bold
                    ${
                      slot.value > 0
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-400"
                    }
                  `}
                >
                  {slot.value}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const InfoCard = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-lg border border-gray-300 bg-white px-3 py-2">
      <p className="text-[10px] font-semibold uppercase text-gray-500">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-bold text-gray-800">
        {value}
      </p>
    </div>
  );
};
