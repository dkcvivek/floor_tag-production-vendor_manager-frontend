"use client";

import Navbar from "@/app/components/Navbar";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

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

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <main className="px-3 py-4 space-y-4 pb-24">
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
              href="/qr-assignment-process"
              className="w-full h-10 rounded-md bg-[#1E90FF] text-white text-sm font-medium flex items-center justify-center transition-colors hover:bg-blue-600 active:bg-blue-700"
            >
              Start QR Assignment Process
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Page;
