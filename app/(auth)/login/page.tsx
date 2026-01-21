"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useDebounce from "@/app/hooks/useDebounce";
import { apiCall } from "@/app/api/apiConfig";

type Errors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setOtpSent(true);
    }
  };

  const handleEditPhone = () => {
    setOtpSent(false);
    setOtp("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {

    } catch (error) {
      
    }
  };

  // const debouncedValue = useDebounce(formData, 300);

  // useEffect(() => {
  //   console.log("Updated FormData", formData);
  // }, [formData]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-3">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900">Login</h1>
        </div>

        <div className="w-full max-w-85 md:max-w-130 bg-white shadow-md rounded-md p-4 md:p-8">
          <label className="block text-2xl font-medium mb-2 text-left">
            Enter Phone Number
          </label>

          <div className="relative">
            <input
              type="tel"
              placeholder="Enter your phone number"
              maxLength={10}
              value={phone}
              disabled={otpSent}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className={`w-full h-11 rounded px-3 pr-10 border border-gray-400 focus:border-blue-300 ${
                otpSent ? "bg-gray-200" : "bg-white"
              }`}
            />

            {otpSent && (
              <button
                onClick={handleEditPhone}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-red-500 text-white flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

          {!otpSent && (
            <button
              onClick={handleSendOtp}
              className="mt-4 w-full h-11 rounded bg-[#1e90ff] text-white font-semibold"
            >
              Send OTP
            </button>
          )}

          {otpSent && (
            <>
              <label className="block text-base font-medium mt-4 mb-2">
                Enter OTP
              </label>

              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full h-11 rounded px-3 border border-gray-400 bg-white"
              />

              <div className="flex gap-3 mt-4">
                <button className="flex-1 h-11 rounded bg-teal-500 text-white">
                  Resend OTP
                </button>

                <button
                  type="button"
                  className="flex-1 h-11 rounded bg-[#1e90ff] text-white font-semibold"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
