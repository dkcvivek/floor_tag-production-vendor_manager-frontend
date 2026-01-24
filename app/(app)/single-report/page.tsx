import IssuesByColor from "@/app/components/IssuesByColor";
import Navbar from "@/app/components/Navbar";

const page = () => {
  return (
    <>
      <Navbar title={"REMAINING PIECES"} />

      <IssuesByColor />
    </>
  );
};

export default page;
