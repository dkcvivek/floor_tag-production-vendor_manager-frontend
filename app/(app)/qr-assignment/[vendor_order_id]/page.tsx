"use client";

import { apiCall } from "@/app/api/apiConfig";
import Navbar from "@/app/components/Navbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";

const PARTS = ["Top", "Bottom", "Pair"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const DEFAULT_COLORS = ["Red", "Orange", "Blue", "Pink", "Black", "White"];

type QROrderDetail = {
  vendor_order_id: string;
  vendor_order_date: string;
  vendor_order_quantity: number;
  style_name: string;
};

type Checker = {
  checker_id: string;
  checker_name: string;
};

type TrackingStep = {
  tracking_step_id: string;
  position: number;
  assigned_operators: Checker[];
};

export default function Page() {
  const { vendor_order_id } = useParams<{ vendor_order_id: string }>();

  const [part, setPart] = useState("N/A");
  const [size, setSize] = useState("N/A");
  const [color, setColor] = useState("N/A");
  const [colors, setColors] = useState(DEFAULT_COLORS);
  const [customColor, setCustomColor] = useState("#000000");
  const [order, setOrder] = useState<QROrderDetail | null>(null);

  const [trackingStep, setTrackingStep] = useState<TrackingStep | null>(null);
  const [eligibleCheckers, setEligibleCheckers] = useState<Checker[]>([]);
  const [assignedCheckers, setAssignedCheckers] = useState<Checker[]>([]);
  const [selectedChecker, setSelectedChecker] = useState("");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "auto";
  }, [modal]);

  useEffect(() => {
    if (!vendor_order_id) return;

    const init = async () => {
      try {
        setLoading(true);

        const orderRes = await apiCall<QROrderDetail>(
          "GET",
          `/api/v1/vendor-manager/assign-qrs/order/${vendor_order_id}/`,
        );
        setOrder(orderRes.data);

        const stepsRes = await apiCall<TrackingStep[]>(
          "GET",
          `/api/v1/vendor-manager/assign-checkers/order/${vendor_order_id}/`,
        );

        const step = stepsRes.data[0];
        setTrackingStep(step);
        setAssignedCheckers(step.assigned_operators ?? []);

        const checkerRes = await apiCall<Checker[]>(
          "GET",
          `/api/v1/vendor-manager/assign-checkers/list-checkers/${step.tracking_step_id}/`,
        );
        setEligibleCheckers(checkerRes.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [vendor_order_id]);

  const handleAddChecker = async () => {
    if (!selectedChecker || !trackingStep) return;

    try {
      setActionLoading(true);

      await apiCall(
        "POST",
        `/api/v1/vendor-manager/assign-checkers/order/${vendor_order_id}/assign-operator/`,
        {
          checker_id: selectedChecker,
          tracking_step_id: trackingStep.tracking_step_id,
        },
      );

      const checker = eligibleCheckers.find(
        (c) => c.checker_id === selectedChecker,
      );
      if (!checker) return;

      setAssignedCheckers((p) => [...p, checker]);
      setEligibleCheckers((p) =>
        p.filter((c) => c.checker_id !== checker.checker_id),
      );
      setSelectedChecker("");
    } catch (err) {
      setError((err as Error).message);
      setModal("error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveChecker = async (checker: Checker) => {
    if (!trackingStep) return;

    try {
      setActionLoading(true);

      await apiCall(
        "POST",
        `/api/v1/vendor-manager/assign-checkers/order/${vendor_order_id}/remove-operator/`,
        {
          checker_id: checker.checker_id,
          tracking_step_id: trackingStep.tracking_step_id,
        },
      );

      setAssignedCheckers((p) =>
        p.filter((c) => c.checker_id !== checker.checker_id),
      );
      setEligibleCheckers((p) => [...p, checker]);
    } catch (err) {
      setError((err as Error).message);
      setModal("error");
    } finally {
      setActionLoading(false);
    }
  };

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
            {order.style_name}
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
                    setColors((p) => [...p, customColor]);
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

function DataTable({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="space-y-2">
      <p className="text-blue-600 font-semibold text-sm">{title}</p>

      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <table className="w-full text-xs table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2">Color</th>
              <th className="p-2">Size</th>
              <th className="p-2">Pieces</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-gray-300">
                {r.map((c, j) => (
                  <td key={j} className="p-2 text-center">
                    {c}
                  </td>
                ))}
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
