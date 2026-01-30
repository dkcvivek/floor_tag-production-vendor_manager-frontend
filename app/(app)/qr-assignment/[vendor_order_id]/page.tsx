"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { apiCall } from "@/app/api/apiConfig";

type QROrderDetail = {
  vendor_order_id: string;
  vendor_order_date: string;
  vendor_order_quantity: number;
  style_name: string;
};

export default function QRAssignmentDetailPage() {
  const { vendor_order_id } = useParams<{ vendor_order_id: string }>();
  const [order, setOrder] = useState<QROrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vendor_order_id) return;

    const fetchOrder = async () => {
      try {
        const res = await apiCall<QROrderDetail>(
          "GET",
          `/api/v1/vendor-manager/assign-qrs/order/${vendor_order_id}/`,
        );
        setOrder(res.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [vendor_order_id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!order) return null;

  return (
    <>
      <Navbar title="QR ASSIGNMENT DETAILS" />
      <div className="p-4 space-y-3">
        <h2 className="text-sm font-bold">{order.style_name}</h2>
        <p className="text-sm text-gray-700">
          ORDER DATE: {order.vendor_order_date}
        </p>
        <p className="text-sm text-gray-700">
          TOTAL QUANTITY:{" "}
          <span className="font-semibold">{order.vendor_order_quantity}</span>
        </p>

        {/* Next step: QR scan / assign UI goes here */}
      </div>
    </>
  );
}
