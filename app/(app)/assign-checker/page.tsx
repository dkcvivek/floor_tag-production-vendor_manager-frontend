import Navbar from "@/app/components/Navbar";
import Order_List from "@/app/components/Order_List";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar title="Assign Checker" />
      <Order_List
        buttonLabel="Assign Checkpoint"
        buttonHref="assign-checkpoint"
      />
    </>
  );
};

export default page;
