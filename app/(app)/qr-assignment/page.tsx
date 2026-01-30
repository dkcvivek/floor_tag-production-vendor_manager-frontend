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
        setOrders(res.data);
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
        getDate={(item) => item.vendor_order_date}
        getQuantity={(item) => item.vendor_order_quantity}
        getStyleName={(item) => item.style_name}
        getButtonHref={(item) => `/qr-assignment/${item.vendor_order_id}`}
      />
    </>
  );
}
