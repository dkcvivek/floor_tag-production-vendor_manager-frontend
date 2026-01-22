import { ChevronLeft, House } from "lucide-react";

const SubHeader = ({ header }: { header: string }) => {
  return (
    <div className="flex justify-between items-center p-2 text-white bg-blue-500">
      <button>
        <div className="bg-white text-blue-500">
          <ChevronLeft width={16} height={16} />
        </div>
      </button>

      {header}

      <div className="text-white">
        <House />
      </div>
    </div>
  );
};

export default SubHeader;
