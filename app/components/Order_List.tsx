"use client";

import Link from "next/link";

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
    return <p className="p-4 text-sm text-gray-500">Loading orders...</p>;
  }

  if (error) {
    return <p className="p-4 text-sm text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="px-3 py-4 space-y-4 mb-16">
        {orders.map((item) => (
          <div
            key={getKey(item)}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
          >
            <h2 className="text-sm font-bold text-black mb-2">
              {getStyleName(item)}
            </h2>

            <p className="text-sm font-bold text-red-600">
              ORDER DATE: {getDate(item)}
            </p>

            <p className="text-sm text-gray-700 mb-3">
              TOTAL QUANTITY:{" "}
              <span className="font-semibold">{getQuantity(item)}</span>
            </p>

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

// "use client";

// import Link from "next/link";

// type OrderListProps<T> = {
//   orders: T[];
//   buttonLabel: string;
//   buttonHref: string;

//   getKey: (item: T) => string | number;
//   getTitle: (item: T) => string;
//   getDate: (item: T) => string;
//   getQuantity: (item: T) => string | number;
//   getStyleName: (item: T) => string;
//   getButtonHref: (item: T) => string;

//   loading?: boolean;
//   error?: string | null;
// };

// function Order_List<T>({
//   orders,
//   buttonLabel,
//   buttonHref,
//   getKey,
//   getTitle,
//   getDate,
//   getQuantity,
//   getStyleName,
//   loading = false,
//   error = null,
// }: OrderListProps<T>) {
//   if (loading) {
//     return <p className="p-4 text-sm text-gray-500">Loading orders...</p>;
//   }

//   if (error) {
//     return <p className="p-4 text-sm text-red-600">{error}</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <main className="px-3 py-4 space-y-4 mb-16">
//         {orders.map((item) => (
//           <div
//             key={getKey(item)}
//             className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
//           >
//             <h2 className="text-sm font-bold text-black leading-snug mb-2">
//               {getStyleName(item)}
//             </h2>

//             <p className="text-sm font-bold text-red-600">
//               ORDER DATE: {getDate(item)}
//             </p>

//             <p className="text-sm text-gray-700 mb-3">
//               TOTAL QUANTITY:{" "}
//               <span className="font-semibold">
//                 {getQuantity(item)}
//               </span>
//             </p>

//             <Link
//               href={buttonHref}
//               className="w-full h-10 rounded-md bg-[#1E90FF] text-white text-sm font-medium flex items-center justify-center transition-colors hover:bg-blue-600 active:bg-blue-700"
//             >
//               {buttonLabel}
//             </Link>
//           </div>
//         ))}

//         {orders.length === 0 && (
//           <p className="text-center text-sm text-gray-500">
//             No data found
//           </p>
//         )}
//       </main>
//     </div>
//   );
// }

// export default Order_List;
