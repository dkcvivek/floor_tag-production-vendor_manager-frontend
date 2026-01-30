"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Order_List from "@/app/components/Order_List";
import { apiCall } from "@/app/api/apiConfig";

export type EligibleStyle = {
  vendor_order_id: string;
  order_quantity: number;
  earliest_ship_date: string;
  style_name: string;
};

export default function Page() {
  const [orders, setOrders] = useState<EligibleStyle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await apiCall<EligibleStyle[]>(
          "GET",
          "/api/v1/vendor-manager/assign-checkers/eligible-styles/",
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
      <Navbar title="Assign Checker" />
      <Order_List
        orders={orders}
        loading={loading}
        error={error}
        buttonLabel="Assign Checkpoint"
        getKey={(item) => item.vendor_order_id}
        getTitle={(item) => `ORDER ID: ${item.vendor_order_id}`}
        getDate={(item) => item.earliest_ship_date}
        getQuantity={(item) => item.order_quantity}
        getStyleName={(item) => item.style_name}
        getButtonHref={(item) => `/assign-checker/${item.vendor_order_id}`}
      />
    </>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "@/app/components/Navbar";
// import Order_List from "@/app/components/Order_List";
// import { apiCall } from "@/app/api/apiConfig";

// export type EligibleStyle = {
//   vendor_order_id: string;
//   order_quantity: number;
//   earliest_ship_date: string;
//   style_name: string;
// };

// const Page = () => {
//   const [orders, setOrders] = useState<EligibleStyle[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await apiCall<EligibleStyle[]>(
//           "GET",
//           "/api/v1/vendor-manager/assign-checkers/eligible-styles/",
//         );
//         setOrders(res.data);
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <>
//       <Navbar title="Assign Checker" />
//       <Order_List
//         orders={orders}
//         loading={loading}
//         error={error}
//         buttonLabel="Assign Checkpoint"
//         buttonHref="assign-checkpoint"
//         getKey={(item) => item.vendor_order_id}
//         getTitle={(item) => `ORDER ID: ${item.vendor_order_id}`}
//         getDate={(item) => item.earliest_ship_date}
//         getQuantity={(item) => item.order_quantity}
//         getStyleName={(item) => item.style_name}
//       />
//     </>
//   );
// };

// export default Page;
