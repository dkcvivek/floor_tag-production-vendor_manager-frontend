"use client";
import Navbar from "@/app/components/Navbar";

export default function Page() {
  return (
    <>
      <Navbar title="QR PACKAGING PROCESS" />
      <div className="min-h-dvh w-full bg-[#f5f7fb] flex justify-center px-3 py-4 pb-20 overflow-y-auto">
        <div className="w-full max-w-95 space-y-4">
          <h1 className="text-blue-600 font-bold tracking-wide text-lg">
            BLACKTHERMAL
          </h1>

          <Card>
            <Label>CHOOSE PO</Label>
            <Select options={["N/A"]} />
          </Card>

          <Card>
            <Label>Assigned Checker:</Label>

            <div className="flex gap-2 flex-wrap mt-1">
              <Chip text="HRIDESH" />
              <Chip text="SHIV KUMAR" />
            </div>

            <div className="flex gap-2 mt-2">
              <select className="flex-1 h-8 rounded-md px-2 text-xs shadow-sm bg-white">
                <option>SELECT CHECKER</option>
              </select>

              <button
                disabled
                className="px-3 h-8 rounded-md bg-gray-200 text-gray-400 text-[10px] font-semibold"
              >
                ADD CHECKER
              </button>
            </div>
          </Card>

          <button className="w-full h-10 bg-blue-500 text-white font-semibold rounded-md shadow-md active:scale-[0.98]">
            START
          </button>

          <p className="text-blue-600 font-semibold text-sm mt-2">History</p>

          <POBlock
            po="PO#: 6251660"
            rows={[
              ["Red", "S", "500"],
              ["Orange", "XL", "200"],
              ["Blue", "M", "1000"],
              ["Pink", "L", "250"],
            ]}
          />

          <POBlock
            po="PO#: 6251660"
            rows={[
              ["Red", "S", "500"],
              ["Blue", "XS", "28"],
              ["Pink", "M", "100"],
            ]}
          />
        </div>
      </div>
    </>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-md p-3 shadow-sm space-y-2">
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold text-gray-700">{children}</p>;
}

function Select({ options }: { options: string[] }) {
  return (
    <select className="w-full h-8 rounded-md px-2 text-xs shadow-sm bg-white">
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function Chip({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-1 bg-blue-500 text-white text-[10px] px-2 py-1 rounded-full shadow-sm">
      {text}
      <span className="text-xs leading-none">×</span>
    </span>
  );
}

function POBlock({ po, rows }: { po: string; rows: string[][] }) {
  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      <div className="px-3 py-2 text-[11px] font-semibold">{po}</div>

      <table className="w-full text-[11px]">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-3 py-2 text-left">Color</th>
            <th className="px-3 py-2 text-left">Size</th>
            <th className="px-3 py-2 text-right">Pieces</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-gray-100">
              <td className="px-3 py-2">{row[0]}</td>
              <td className="px-3 py-2">{row[1]}</td>
              <td className="px-3 py-2 text-right">{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
