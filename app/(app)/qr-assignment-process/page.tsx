"use client";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";

const PARTS = ["Top", "Bottom", "Pair"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const DEFAULT_COLORS = ["Red", "Orange", "Blue", "Pink", "Black", "White"];

export default function Page() {
  const [part, setPart] = useState("N/A");
  const [size, setSize] = useState("N/A");
  const [color, setColor] = useState("N/A");
  const [colors, setColors] = useState(DEFAULT_COLORS);
  const [customColor, setCustomColor] = useState("#000000");

  const [modal, setModal] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "auto";
  }, [modal]);

  const handleStart = () => {
    const isSuccess = Math.random() > 0.5;
    setModal(isSuccess ? "success" : "error");
  };

  return (
    <>
      <Navbar title="QR ASSIGNMENT PROCESS" />
      <div
        className={`min-h-dvh w-full bg-[#f5f7fb] flex justify-center px-3 py-4 transition-all ${
          modal ? "blur-sm" : ""
        }`}
      >
        <div className="w-full max-w-[420px] space-y-4">
          <h1 className="text-blue-600 font-bold tracking-wide text-lg">
            BLACKTHERMAL
          </h1>

          <Card label="CHOOSE PARTS">
            <Select value={part} onChange={setPart} options={PARTS} />
          </Card>

          <Card label="CHOOSE COLOR">
            <Select value={color} onChange={setColor} options={colors} />

            <div className="flex items-center gap-3 mt-3">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="h-9 w-9 rounded-md shadow-sm"
              />
              <button
                onClick={() => {
                  if (!colors.includes(customColor)) {
                    setColors((prev) => [...prev, customColor]);
                    setColor(customColor);
                  }
                }}
                className="text-xs font-semibold text-blue-600"
              >
                Add custom color
              </button>
            </div>
          </Card>

          <Card label="CHOOSE SIZE">
            <Select value={size} onChange={setSize} options={SIZES} />
          </Card>

          <Card label="Assigned Checker:">
            <div className="flex gap-2 flex-wrap">
              <Chip text="HRIDESH" />
              <Chip text="SHIV KUMAR" />
            </div>

            <div className="flex gap-2 mt-2">
              <select className="flex-1 h-9 rounded-md px-2 text-sm shadow-sm">
                <option>Select Checker</option>
              </select>

              <button
                disabled
                className="px-3 h-9 rounded-md bg-gray-200 text-gray-400 text-xs font-semibold"
              >
                ADD CHECKER
              </button>
            </div>
          </Card>

          <button
            onClick={handleStart}
            className="w-full h-11 bg-blue-500 text-white font-semibold rounded-md shadow-md active:scale-[0.98]"
          >
            START
          </button>

          <DataTable title="CURRENT PROCESS" rows={[["Red", "S", "500"]]} />

          <DataTable
            title="History"
            rows={[
              ["Red", "S", "500"],
              ["Orange", "XL", "200"],
              ["Blue", "M", "1000"],
              ["Pink", "L", "250"],
            ]}
          />
        </div>
      </div>

      {/* MODALS */}
      {modal === "error" && <ErrorModal onClose={() => setModal(null)} />}
      {modal === "success" && <SuccessModal onClose={() => setModal(null)} />}
    </>
  );
}

function Card({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-md p-3 shadow-sm space-y-2">
      <p className="text-xs font-semibold text-gray-700">{label}</p>
      {children}
    </div>
  );
}

function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-9 rounded-md px-2 text-sm shadow-sm bg-white"
    >
      <option>N/A</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function Chip({ text }: { text: string }) {
  return (
    <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-sm">
      {text} ×
    </span>
  );
}

function DataTable({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="space-y-2">
      <p className="text-blue-600 font-semibold text-sm">{title}</p>
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Color</th>
              <th className="p-2 text-left">Size</th>
              <th className="p-2 text-right">Pieces</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t border-gray-100">
                <td className="p-2">{row[0]}</td>
                <td className="p-2">{row[1]}</td>
                <td className="p-2 text-right">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ErrorModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalBase bg="bg-red-600" onClose={onClose}>
      <p className="text-3xl font-bold text-center leading-snug">
        Can not assign checker as he is on leave
      </p>
    </ModalBase>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalBase bg="bg-green-600" onClose={onClose}>
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-4xl font-bold mb-4">Assigning checker</p>
        <p className="text-lg opacity-90">Loading...</p>
      </div>
    </ModalBase>
  );
}

function ModalBase({
  bg,
  children,
  onClose,
}: {
  bg: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className={`${bg}
        w-[90%] max-w-[360px] min-h-[300px]
        rounded-lg text-white p-6
        relative
        flex items-center justify-center`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold leading-none"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}
