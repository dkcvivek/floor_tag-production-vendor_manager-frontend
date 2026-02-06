import Button from "./Button";
import { Check } from "lucide-react";
import Navbar from "./Navbar";

const CreateCheckerSuccessPage = ({ name }: { name?: string }) => {
  return (
    <>
      <Navbar title="CREATE CHECKER ACCOUNT" />
      <div className="flex items-center flex-col gap-8 min-h-screen bg-green-700 p-5 text-white">
        {name && <h2 className="text-2xl font-semibold text-white">{name}</h2>}
        <Check size={65} className="font-bold" />
        <h3 className="text-4xl font-bold">Account Created</h3>
        <Button label="Assign Checkpoint" src="assign-checker" />
        <Button label="Create Checker Account" src="create-checker" />
      </div>
    </>
  );
};

export default CreateCheckerSuccessPage;
