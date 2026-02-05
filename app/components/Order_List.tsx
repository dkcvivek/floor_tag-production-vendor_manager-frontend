"use client";

import Link from "next/link";
import Loader from "../components/Loader";

type OrderListProps<T> = {
  orders: T[];
  buttonLabel: string;

  getKey: (item: T) => string | number;
  getTitle: (item: T) => string;
  getDate: (item: T) => string;
  getQuantity: (item: T) => string | number;
  getStyleName: (item: T) => string;

  getButtonHref: (item: T) => string;

  loading?: boolean;
  error?: string | null;
};

function Order_List<T>({
  orders,
  buttonLabel,
  getKey,
  getTitle,
  getDate,
  getQuantity,
  getStyleName,
  getButtonHref,
  loading = false,
  error = null,
}: OrderListProps<T>) {
  if (loading) {
    return <Loader fullscreen />;
  }

  if (error) {
    return <p className="p-4 text-sm text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="px-3 py-4 space-y-4 mb-16">
        {orders.map((item) => (
          <div
            key={getKey(item)}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
          >
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-black">
                Style Name:{" "}
                <span className="text-red-600">{getStyleName(item)}</span>
              </p>

              <p className="text-sm font-bold text-black">
                Order Date:{" "}
                <span className="text-red-600">{getDate(item)}</span>
              </p>

              <p className="text-sm font-bold text-black mb-3">
                Total Quantity:{" "}
                <span className="font-semibold text-red-600">
                  {getQuantity(item)}
                </span>
              </p>
            </div>

            <Link
              href={getButtonHref(item)}
              className="w-full h-10 rounded-md bg-[#1E90FF] text-white text-sm font-medium flex items-center justify-center"
            >
              {buttonLabel}
            </Link>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-sm text-gray-500">No data found</p>
        )}
      </main>
    </div>
  );
}

export default Order_List;
