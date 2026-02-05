"use client";

import { useEffect, useState } from "react";
import { apiCall } from "@/app/api/apiConfig";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import CheckpointCard from "../../assign-checkpoint/page";
import Loader from "../../../components/Loader";

type TrackingStep = {
  tracking_step_id: string;
  type: string;
  position: number;
  assigned_operators: {
    checker_id: string;
    checker_name: string;
  }[];
  tracking_step_data: {
    step?: string;
    location?: string;
    what_to_check?: string;
    how_to_check?: string;
    value?: string;
  };
};

export default function AssignCheckerDetailPage() {
  const { vendor_order_id } = useParams<{ vendor_order_id: string }>();

  const [steps, setSteps] = useState<TrackingStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await apiCall<TrackingStep[]>(
          "GET",
          `/api/v1/vendor-manager/assign-checkers/order/${vendor_order_id}/`,
        );
        setSteps(res.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (vendor_order_id) {
      fetchSteps();
    }
  }, [vendor_order_id]);

  if (loading) return <Loader fullscreen />;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <>
      <Navbar title="Assign Checker" />
      <div className="p-4 space-y-6">
        {steps.map((step) => (
          <CheckpointCard key={step.tracking_step_id} step={step} />
        ))}

        {steps.length === 0 && (
          <p className="text-center text-sm text-gray-500">
            No checkpoints found
          </p>
        )}
      </div>
    </>
  );
}
