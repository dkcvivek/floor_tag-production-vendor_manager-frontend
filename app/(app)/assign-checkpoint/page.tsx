import Navbar from "@/app/components/Navbar";
import React from "react";

type Checker = {
  id: number;
  name: string;
};

const assignedCheckers: Checker[] = [
  { id: 1, name: "Hridesh" },
  { id: 2, name: "Shiv Kumar" },
];

const checkpointItems = [
  { label: "Step:", value: "STITCHING" },
  { label: "Location:", value: "TOP CHEST ALL AROUND" },
  {
    label: "What to check:",
    value: "टनल से टनल के बीच की गैपिंग आल अराउंड यूनिफार्म चाहिए",
  },
  { label: "How to check:", value: "TEMPLATE" },
];



const page = () => {
  return (
    <>
      <Navbar title="Assign Checker" />

      <div className="p-4">
        <div className="max-w-4xl border border-gray-300 rounded-sm">
          <div className="bg-gray-600 text-white px-4 py-3 text-xl font-semibold">
            #1 Check point
          </div>

          <div className="p-4 space-y-4">
            <div className="grid grid-cols-[1fr_2fr] gap-4">
              {checkpointItems.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="border border-gray-200 bg-gray-50 p-3 text-gray-600 font-medium flex items-center">
                    {item.label}
                  </div>
                  <div className="border border-gray-200 bg-gray-50 p-4 text-gray-900 font-semibold">
                    {item.value}
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="pt-2">
              <h3 className="text-lg font-semibold mb-2">Assigned Checkers:</h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {assignedCheckers.map((checker) => (
                  <span
                    key={checker.id}
                    className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {checker.name}
                    <button className="text-blue-500 hover:text-blue-700">
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <select className="flex-1 border border-gray-300 px-3 py-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Select Checker...</option>
                  <option>Hridesh</option>
                  <option>Shiv Kumar</option>
                </select>

                <button
                  disabled
                  className="px-4 py-2 border border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
                >
                  Add Checker
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
