import React from "react";
import Order_List from "../../components/Order_List";
import Navbar from "@/app/components/Navbar";

const page = () => {
  return (
    <>
      <Navbar title="QR PACKAGING PROCESS" />
      <Order_List
        buttonLabel="Start QR Packaging Process"
        buttonHref="/qr-packaging-process"
      />
    </>
  );
};

export default page;
