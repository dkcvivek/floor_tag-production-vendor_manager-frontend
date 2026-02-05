"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Order_List from "@/app/components/Order_List";
import { apiCall } from "@/app/api/apiConfig";

type QROrder = {
  vendor_order_id: string;
  vendor_order_date: string;
  vendor_order_quantity: number;
  style_name: string;
};

const formatDate = (isoDate: string) => {
  if (!isoDate) return "N/A";

  return new Date(isoDate).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function QRAssignmentPage() {
  const [orders, setOrders] = useState<QROrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await apiCall<QROrder[]>(
          "GET",
          "/api/v1/vendor-manager/assign-qrs/list-orders/",
        );

        const sortedOrders = [...res.data].sort(
          (a, b) =>
            new Date(b.vendor_order_date).getTime() -
            new Date(a.vendor_order_date).getTime(),
        );

        setOrders(sortedOrders);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar title="QR ASSIGNMENT PROCESS" />
      <Order_List
        orders={orders}
        loading={loading}
        error={error}
        buttonLabel="Start QR Assignment Process"
        getKey={(item) => item.vendor_order_id}
        getTitle={(item) => `ORDER ID: ${item.vendor_order_id}`}
        getDate={(item) => formatDate(item.vendor_order_date)}
        getQuantity={(item) => item.vendor_order_quantity}
        getStyleName={(item) => item.style_name}
        getButtonHref={(item) => `/qr-assignment/${item.vendor_order_id}`}
      />
    </>
  );
}
