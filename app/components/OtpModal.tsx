"use client";

import { useState } from "react";

interface OtpModalProps {
  onClose: () => void;
  onValidateOtp: (otp: string) => Promise<void>;
  isOtpCorrect: boolean | null; 
}

const OtpModal: React.FC<OtpModalProps> = ({
  onClose,
  onValidateOtp,
  isOtpCorrect,
}) => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = async (value: string) => {
    const digitsOnly = value.replace(/\D/g, "");

    if (digitsOnly.length <= 4) {
      setOtp(digitsOnly);

      if (digitsOnly.length === 4) {
        await onValidateOtp(digitsOnly);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-87.5 rounded-md border-2 border-blue-500 bg-white p-5">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Enter OTP</h2>
          <button onClick={onClose} className="text-2xl font-bold leading-none">
            X
          </button>
        </div>

        <input
          type="text"
          value={otp}
          onChange={(e) => handleOtpChange(e.target.value)}
          className="w-full rounded-md bg-gray-100 px-4 py-3 text-center text-xl tracking-widest outline-none focus:ring-2 focus:ring-blue-400"
        />

        {isOtpCorrect === false && (
          <div className="mt-8 flex flex-col items-center">
            <h3 className="text-2xl text-red-500 font-bold">✕</h3>
            <span className="text-xl font-semibold">Invalid OTP</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtpModal;
