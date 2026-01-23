import Navbar from "@/app/components/Navbar";
import Order_List from "../../components/Order_List";

const page = () => {
  return (
    <>
    <Navbar title="QR ASSIGNMENT PROCESS"/>
      <Order_List
      buttonLabel="Start QR Assignment Process"
      buttonHref="/qr-assignment-process"
    />
    </>
  );
};

export default page;
