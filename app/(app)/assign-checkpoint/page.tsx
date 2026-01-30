"use client";

import { useEffect, useState } from "react";
import { apiCall } from "@/app/api/apiConfig";
import { useParams } from "next/navigation";

type TrackingStepData = {
  step?: string;
  location?: string;
  what_to_check?: string;
  how_to_check?: string;
};

type Checker = {
  checker_id: string;
  checker_name: string;
};

type Step = {
  tracking_step_id: string;
  position: number;
  assigned_operators: Checker[];
  tracking_step_data: TrackingStepData;
};

type Props = {
  step: Step;
};

const CheckpointCard = ({ step }: Props) => {
  const { vendor_order_id } = useParams<{ vendor_order_id: string }>();

  const [eligibleCheckers, setEligibleCheckers] = useState<Checker[]>([]);
  const [assignedOperators, setAssignedOperators] = useState<Checker[]>(
    step.assigned_operators ?? [],
  );
  const [selectedChecker, setSelectedChecker] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCheckers = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await apiCall<Checker[]>(
          "GET",
          `/api/v1/vendor-manager/assign-checkers/list-checkers/${step.tracking_step_id}/`,
        );

        setEligibleCheckers(res.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckers();
  }, [step.tracking_step_id]);

  const handleAddChecker = async () => {
    if (!selectedChecker) return;

    try {
      setActionLoading(true);
      setError(null);

      await apiCall(
        "POST",
        `/api/v1/vendor-manager/assign-checkers/order/${vendor_order_id}/assign-operator/`,
        {
          checker_id: selectedChecker,
          tracking_step_id: step.tracking_step_id,
        },
      );

      const checker = eligibleCheckers.find(
        (c) => c.checker_id === selectedChecker,
      );

      if (!checker) return;

      setAssignedOperators((prev) => [...prev, checker]);
      setEligibleCheckers((prev) =>
        prev.filter((c) => c.checker_id !== checker.checker_id),
      );
      setSelectedChecker("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveChecker = async (checker: Checker) => {
    try {
      setActionLoading(true);
      setError(null);

      await apiCall(
        "POST",
        `/api/v1/vendor-manager/assign-checkers/order/${vendor_order_id}/remove-operator/`,
        {
          checker_id: checker.checker_id,
          tracking_step_id: step.tracking_step_id,
        },
      );

      setAssignedOperators((prev) =>
        prev.filter((c) => c.checker_id !== checker.checker_id),
      );
      setEligibleCheckers((prev) => [...prev, checker]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="max-w-4xl border border-gray-300 rounded-sm">
      <div className="bg-gray-600 text-white px-4 py-3 text-xl font-semibold">
        #{step.position} Checkpoint
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          {Object.entries(step.tracking_step_data).map(([key, value]) => {
            if (!value) return null;

            return (
              <div key={key} className="contents">
                <div className="bg-gray-50 p-3 capitalize">
                  {key.replaceAll("_", " ")}
                </div>
                <div className="bg-gray-50 p-3">{value}</div>
              </div>
            );
          })}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Assigned Checkers</h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {assignedOperators.length === 0 && (
              <p className="text-sm text-gray-500">No checkers assigned yet</p>
            )}

            {assignedOperators.map((checker) => (
              <span
                key={checker.checker_id}
                className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {checker.checker_name}
                <button
                  onClick={() => handleRemoveChecker(checker)}
                  disabled={actionLoading}
                  className="text-blue-500 hover:text-blue-700 disabled:opacity-50"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <select
              value={selectedChecker}
              onChange={(e) => setSelectedChecker(e.target.value)}
              className="flex-1 border px-3 py-2 rounded-sm"
              disabled={actionLoading}
            >
              <option value="">Select Checker...</option>
              {eligibleCheckers.map((checker) => (
                <option key={checker.checker_id} value={checker.checker_id}>
                  {checker.checker_name}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddChecker}
              disabled={!selectedChecker || actionLoading}
              className="px-4 py-2 bg-blue-500 text-white disabled:bg-gray-300"
            >
              {actionLoading ? "Processing..." : "Add Checker"}
            </button>
          </div>

          {loading && <p className="text-sm">Loading checkers...</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default CheckpointCard;
