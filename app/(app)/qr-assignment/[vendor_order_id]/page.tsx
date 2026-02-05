"use client";

import { apiCall } from "@/app/api/apiConfig";
import Navbar from "@/app/components/Navbar";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ApiHistoryResponse,
  ApiProcessResponse,
  AssignQrsOrderResponse,
  HistoryItem,
  mapHistoryResponse,
  mapProcessResponse,
  mapStyleResponse,
  Process,
  Style,
} from "../mapper/assignmentQRsOrder.mapper";
import Loader from "../../../components/Loader";

// const DEFAULT_COLORS = ["Red", "Orange", "Blue", "Pink", "Black", "White"];

const mockCurrentProcess: Process = {
  id: 101,
  stylePartId: "SP-001",
  stylePartName: "Top",
  ticketColor: "Red",
  vendorColor: "Red",
  size: "S",
  pieces: 500,
  operators: [
    {
      id: "OP-01",
      name: "NS",
    },
    {
      id: "OP-02",
      name: "RK",
    },
  ],
};

const mockProcessHistory: HistoryItem[] = [
  {
    id: 95,
    stylePartId: "SP-001",
    stylePartName: "Top",
    ticketColor: "Red",
    vendorColor: "Red",
    size: "S",
    status: "completed",
    pieces: 450,
    loggedAt: new Date("2024-12-28T09:30:00"),
    operators: [
      {
        id: "OP-01",
        name: "NS",
      },
    ],
  },
  {
    id: 88,
    stylePartId: "SP-001",
    stylePartName: "Top",
    ticketColor: "Blue",
    vendorColor: "Blue",
    size: "M",
    status: "completed",
    pieces: 520,
    loggedAt: new Date("2024-12-26T16:10:00"),
    operators: [
      {
        id: "OP-02",
        name: "RK",
      },
      {
        id: "OP-03",
        name: "AM",
      },
    ],
  },
  {
    id: 73,
    stylePartId: "SP-002",
    stylePartName: "Bottom",
    ticketColor: "Green",
    vendorColor: "Green",
    size: "L",
    status: "failed",
    pieces: 300,
    loggedAt: new Date("2024-12-22T11:45:00"),
    operators: [],
  },
];

export default function Page() {
  const params = useParams();
  const vendorOrderId = params?.vendor_order_id;

  const [part, setPart] = useState("N/A");
  const [size, setSize] = useState("N/A");
  const [color, setColor] = useState("N/A");
  // const [colors, setColors] = useState(DEFAULT_COLORS);
  // const [customColor, setCustomColor] = useState("#000000");

  const [order, setOrder] = useState<Style | null>(null);
  const [currentProcess, setCurrentProcess] = useState<Process | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "auto";
  }, [modal]);

  useEffect(() => {
    if (typeof vendorOrderId !== "string") return;

    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const [orderRes, processRes, historyRes] = await Promise.all([
          apiCall<AssignQrsOrderResponse>(
            "GET",
            `/api/v1/vendor-manager/assign-qrs/order/${vendorOrderId}/`,
          ),
          apiCall<ApiProcessResponse>(
            "GET",
            `/api/v1/vendor-manager/assign-qrs/order/${vendorOrderId}/current-process/`,
          ),
          apiCall<ApiHistoryResponse>(
            "GET",
            `/api/v1/vendor-manager/assign-qrs/order/${vendorOrderId}/process-history/`,
          ),
        ]);

        setOrder(mapStyleResponse(orderRes.data));
        setCurrentProcess(mapProcessResponse(processRes.data));
        setHistory(mapHistoryResponse(historyRes.data));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [vendorOrderId]);

  const partOptions = order?.parts.map((p) => p.name) ?? [];

  const colorOptions = order?.colorSizes
    ? Array.from(new Set(order.colorSizes.map((cs) => cs.vendorColor)))
    : [];

  const sizeOptions = order?.colorSizes
    ? Array.from(new Set(order.colorSizes.map((cs) => cs.size.toUpperCase())))
    : [];

  const handleStart = () => {
    setModal("success");
  };

  if (loading) return <Loader fullscreen />;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!order) return null;
  return (
    <>
      <Navbar title="QR ASSIGNMENT PROCESS" />


      <div
        className={`min-h-dvh w-full bg-[#f5f7fb] flex justify-center px-3 py-4 pb-16 ${
          modal ? "blur-sm" : ""
        }`}
      >
        <div className="w-full max-w-105 space-y-4">
          <h1 className="text-blue-600 font-bold tracking-wide text-lg">
            {order?.styleName}
          </h1>

          <Card label="CHOOSE PARTS">
            <Select value={part} onChange={setPart} options={partOptions} />
          </Card>

          <Card label="CHOOSE COLOR">
            <Select value={color} onChange={setColor} options={colorOptions} />

            {/* <div className="flex items-center gap-3 mt-3">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="h-9 w-9 rounded-md shadow-sm"
              />
              <button
                onClick={() => {
                  if (!colors.includes(customColor)) {
                    setColors((p) => [...p, customColor]);
                    setColor(customColor);
                  }
                }}
                className="text-xs font-semibold text-blue-600"
              >
                Add custom color
              </button>
            </div> */}
          </Card>

          <Card label="CHOOSE SIZE">
            <Select value={size} onChange={setSize} options={sizeOptions} />
          </Card>

          <Card label="Assigned Checker:">
            <div className="flex gap-2 flex-wrap">
              {assignedCheckers.length === 0 && (
                <p className="text-xs text-gray-500">
                  No checkers assigned yet
                </p>
              )}

              {assignedCheckers.map((c) => (
                <span
                  key={c.checker_id}
                  className="flex items-center gap-1 bg-blue-500 text-white text-xs px-3 py-1 rounded-full"
                >
                  {c.checker_name}
                  <button
                    onClick={() => handleRemoveChecker(c)}
                    disabled={actionLoading}
                    className="ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 mt-2">
              <select
                value={selectedChecker}
                onChange={(e) => setSelectedChecker(e.target.value)}
                className="flex-1 h-9 rounded-md px-2 text-sm shadow-sm"
                disabled={actionLoading}
              >
                <option value="">Select Checker</option>
                {eligibleCheckers.map((c) => (
                  <option key={c.checker_id} value={c.checker_id}>
                    {c.checker_name}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddChecker}
                disabled={!selectedChecker || actionLoading}
                className="px-3 h-9 rounded-md bg-blue-500 text-white text-xs font-semibold disabled:bg-gray-300"
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

          {/* Static UI */}
          {mockCurrentProcess && (
            <ProcessDetailsTable
              process={mockCurrentProcess}
              onMarkComplete={() => {
                console.log("Mark completed:", mockCurrentProcess.id);
              }}
            />
          )}

          {mockProcessHistory && (
            <ProcessHistoryTable history={mockProcessHistory} />
          )}
        </div>
      </div>

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

interface ProcessDetailsTableProps {
  process: Process;
  onMarkComplete?: () => void;
}

export function ProcessDetailsTable({
  process,
  onMarkComplete,
}: ProcessDetailsTableProps) {
  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      <table className="w-full text-sm border border-gray-100">
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="w-1/3 p-3 font-semibold text-center border-r border-gray-100">
              Part
            </td>
            <td className="p-3 text-center">{process.stylePartName}</td>
          </tr>

          <tr className="border-b border-gray-100">
            <td className="p-3 font-semibold text-center border-r border-gray-100">
              Ticket color / Vendor color
            </td>
            <td className="p-3 text-center">
              {process.ticketColor}
              {process.vendorColor && <span> / {process.vendorColor}</span>}
            </td>
          </tr>

          <tr className="border-b border-gray-100">
            <td className="p-3 font-semibold text-center border-r border-gray-100">
              Size
            </td>
            <td className="p-3 text-center">{process.size}</td>
          </tr>

          <tr className="border-b border-gray-100">
            <td className="p-3 font-semibold text-center border-r border-gray-100">
              Pieces
            </td>
            <td className="p-3 text-center">{process.pieces}</td>
          </tr>

          <tr className="border-b border-gray-100">
            <td className="p-3 font-semibold text-center border-r border-gray-100">
              Operators
            </td>
            <td className="p-3 text-center">
              {process.operators.length
                ? process.operators.map((op) => op.name).join(", ")
                : ""}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-semibold text-center border-r border-gray-100">
              Action
            </td>
            <td className="p-3 text-center">
              <button
                onClick={onMarkComplete}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded"
              >
                MARK COMPLETED
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

interface ProcessHistoryTableProps {
  history: HistoryItem[];
}

export function ProcessHistoryTable({ history }: ProcessHistoryTableProps) {
  if (!history.length) {
    return (
      <div className="text-center text-sm text-gray-400 py-4">
        No history available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-sm overflow-x-auto">
      <table className="w-full text-sm border border-gray-100">
        <tbody>
          {/* PART */}
          <tr className="border-b border-gray-100">
            <td className="p-3 font-semibold text-center border-r border-gray-100">
              Part
            </td>
            {history.map((item) => (
              <td
                key={item.id}
                className="p-3 text-center border-r border-gray-100 last:border-r-0"
              >
                {item.stylePartName}
              </td>
            ))}
          </tr>

          {/* COLORS */}
          <tr className="border-b border-gray-100">
            <td className="p-3 font-semibold text-center border-r border-gray-100">
              Ticket / Vendor
            </td>
            {history.map((item) => (
              <td
                key={item.id}
                className="p-3 text-center border-r border-gray-100 last:border-r-0"
              >
                {item.ticketColor}
                {item.vendorColor && (
                  <span> / {item.vendorColor}</span>
                )}
              </td>
            ))}
          </tr>

          {/* SIZE */}
          <tr className="border-b border-gray-100">
            <td className="p-3 font-semibold text-center border-r border-gray-100">
              Size
            </td>
            {history.map((item) => (
              <td
                key={item.id}
                className="p-3 text-center border-r border-gray-100 last:border-r-0"
              >
                {item.size}
              </td>
            ))}
          </tr>

          {/* PIECES */}
          <tr className="border-b border-gray-100">
            <td className="p-3 font-semibold text-center border-r border-gray-100">
              Pieces
            </td>
            {history.map((item) => (
              <td
                key={item.id}
                className="p-3 text-center border-r border-gray-100 last:border-r-0"
              >
                {item.pieces}
              </td>
            ))}
          </tr>

          {/* OPERATORS */}
          <tr className="border-b border-gray-100">
            <td className="p-3 font-semibold text-center border-r border-gray-100">
              Operators
            </td>
            {history.map((item) => (
              <td
                key={item.id}
                className="p-3 text-center border-r border-gray-100 last:border-r-0"
              >
                {item.operators.length
                  ? item.operators.map((op) => op.name).join(", ")
                  : "-"}
              </td>
            ))}
          </tr>

          {/* STATUS */}
          <tr className="border-b border-gray-100">
            <td className="p-3 font-semibold text-center border-r border-gray-100">
              Status
            </td>
            {history.map((item) => (
              <td
                key={item.id}
                className="p-3 text-center capitalize border-r border-gray-100 last:border-r-0"
              >
                {item.status}
              </td>
            ))}
          </tr>

          {/* LOGGED AT */}
          <tr>
            <td className="p-3 font-semibold text-center border-r border-gray-100">
              Logged at
            </td>
            {history.map((item) => (
              <td
                key={item.id}
                className="p-3 text-center border-r border-gray-100 last:border-r-0"
              >
                {item.loggedAt.toLocaleString()}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ErrorModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalBase bg="bg-red-600" onClose={onClose}>
      <p className="text-2xl font-bold text-center">
        Cannot assign checker (on leave)
      </p>
    </ModalBase>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalBase bg="bg-green-600" onClose={onClose}>
      <p className="text-2xl font-bold text-center">Process Started</p>
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
        className={`${bg} w-[90%] max-w-90 min-h-60 rounded-lg text-white p-6 relative flex items-center justify-center`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
