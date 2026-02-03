import Button from "../components/Button";
import Image from "next/image";
import Link from "next/link";
import { useAuthGuard } from "../hooks/useAuthGuard";

const buttonsInfo = [
  { label: "CREATE CHECKER ACCOUNT", src: "create-checker" },
  { label: "ALL ISSUES", src: "issue-list" },
  { label: "ASSIGN CHECKER", src: "assign-checker" },
  { label: "SEE REPORTS", src: "all-report" },
  { label: "Start QR Assignment Process", src: "qr-assignment" },
  { label: "Start QR Packaging Process", src: "qr-packaging" },
];

function HomePage() {
  // useAuthGuard();

  return (
    <>
      <div className="flex flex-col justify-evenly min-h-screen px-5 gap-4 pt-20">
        <Link
          href={"scan"}
          className="w-full bg-blue-500 text-white font-semibold py-4 px-8 rounded-xl shadow-sm flex items-center justify-between gap-4"
        >
          <div className="flex-1 text-4xl">SCAN QR</div>

          <Image src={"/images/qr.png"} alt="" width={127} height={127} />
        </Link>

        {buttonsInfo.map((item, index) => {
          return <Button key={index} label={item.label} src={item.src} />;
        })}
      </div>
    </>
  );
}

export default HomePage;
