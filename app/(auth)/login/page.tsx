"use client";

import { useState } from "react";
import { apiCall } from "@/app/api/apiConfig";
import { useRouter } from "next/navigation";
import { LoginResponseData } from "@/app/types/types";
import Loader from "../../components/Loader";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("5042302851");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async () => {
    if (phone.length < 10 || phone.length > 15) {
      setError("Enter a valid phone number");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await apiCall("POST", "/api/v1/vendor-manager/otp/send/", {
        phone_number: phone,
      });

      setOtpSent(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPhone = () => {
    setOtpSent(false);
    setOtp("");
    setError(null);
  };

  const handleSubmit = async () => {
    if (otp.length !== 4) {
      setError("OTP must be 4 digits");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await apiCall<LoginResponseData>(
        "POST",
        "/api/v1/vendor-manager/login/phone-number/",
        {
          phone_number: phone,
          otp,
        },
      );

      document.cookie = "auth=true; path=/";
      localStorage.setItem("access_token", res.data.token);

      router.replace("/");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-gray-900">Login</h1>
      </div>

      <div className="w-full max-w-85 md:max-w-130 bg-white shadow-md h-full rounded-md p-4 md:p-8">
        <label className="block text-2xl font-medium mb-2 text-left">
          Enter Phone Number
        </label>

        <div className="relative">
          <input
            type="tel"
            placeholder="Enter your phone number"
            maxLength={15}
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
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-red-500 text-white"
            >
              ✕
            </button>
          )}
        </div>

        {!otpSent && (
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="mt-4 w-full h-11 rounded bg-[#1e90ff] text-white font-semibold disabled:opacity-60"
          >
            {loading ? <Loader size={6} color="#fff" /> : "Send OTP"}
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
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 h-11 rounded bg-[#1e90ff] text-white font-semibold disabled:opacity-60"
              >
                {loading ? <Loader size={6} color="#fff" /> : "Submit"}
              </button>
            </div>

            <p className="text-red-500 mt-4">
              अपना{" "}
              <img
                className="inline-block mx-1"
                width={20}
                height={20}
                src="/whatsapp-2.svg"
                alt=""
              />{" "}
              Whats app या SMS/Message चेक' करे OTP के लिए{" "}
            </p>

            <div className="absolute bottom-10 left-5">
              <button
                onClick={handleSendOtp}
                className="flex-1 rounded  text-blue-500 border-2 border-blue-500 px-3 py-2 font-semibold"
              >
                Resend OTP
              </button>
            </div>
          </>
        )}

        {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
      </div>
    </div>
  );
}
