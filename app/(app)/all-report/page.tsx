"use client";

import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiCall } from "@/app/api/apiConfig";
import { Style } from "@/app/types/types";
import Order_List from "@/app/components/Order_List";

import Link from "next/link";
import {
  mapEligibleStylesToOrderUI,
  OrderUIModel,
} from "./mapper/order.mapper";

const data = [
  {
    title: "FREE EST BAG GOLDEN FLUFFY RED ORANGE WITH TRIMS",
    orderDate: "9 JAN 2026",
    quantity: "100000",
  },
  {
    title: "BLAKE THERMAL",
    orderDate: "9 JAN 2026",
    quantity: "100000",
  },
  {
    title: "FREE EST BAG GOLDEN FLUFFY RED ORANGE WITH TRIMS",
    orderDate: "9 JAN 2026",
    quantity: "100000",
  },
];

export default function SeeReportsPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderUIModel[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await apiCall<Style[]>(
          "GET",
          "/api/v1/vendor-manager/vendor-orders/",
        );
        const orders = mapEligibleStylesToOrderUI(res.data);
        setOrders(orders);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (error) {
    return (
      <>
        <Navbar title="REPORTS" />
        <div className="min-h-screen bg-gray-100">
          <main className="px-3 py-4 space-y-4 mb-16">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
              >
                <h2 className="text-sm font-bold text-black leading-snug mb-2">
                  {item.title}
                </h2>

                <p className="text-sm font-bold text-red-600">
                  ORDER DATE: {item.orderDate}
                </p>

                <p className="text-sm text-gray-700 mb-3">
                  TOTAL QUANTITY:{" "}
                  <span className="font-semibold">{item.quantity}</span>
                </p>

                <Link
                  href={"see-reports"}
                  className="w-full h-10 rounded-md bg-[#1E90FF] text-white text-sm font-medium flex items-center justify-center transition-colors hover:bg-blue-600 active:bg-blue-700"
                >
                  {"See Reports"}
                </Link>
              </div>
            ))}
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar title="REPORTS" />

      <Order_List
        orders={orders}
        loading={loading}
        error={error}
        buttonLabel="See Reports"
        getKey={(item) => item.id}
        getTitle={(item) => `ORDER ID: ${item.id}`}
        getDate={(item) => item.shipDate}
        getQuantity={(item) => item.quantity}
        getStyleName={(item) => item.styleName}
        getButtonHref={(item) => `/see-reports}`}
      />
    </>
  );
}
