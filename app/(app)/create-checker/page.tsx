"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import { CreateCheckerFormError } from "@/app/types/types";
import { handleMobileInput } from "@/app/lib/helper";
import OtpModal from "@/app/components/OtpModal";
import CreateCheckerSuccessPage from "@/app/components/create-checker-success";
import { apiCall } from "@/app/api/apiConfig";
import Loader from "../../components/Loader";

function CreateChecker() {
  const [mobile, setMobile] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [otpStatus, setOtpStatus] = useState<boolean>(false);
  const [isOtpCorrect, setIsOtpCorrect] = useState<boolean | null>(null);


  const [errors, setErrors] = useState<CreateCheckerFormError>({});
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = () => {
    const newErrors: CreateCheckerFormError = {};

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    }

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      await Promise.all([
        apiCall("POST", "/api/v1/vendor-manager/user/phone-number-exists/", {
          phone_number: mobile,
        }),
        apiCall("POST", "/api/v1/vendor-manager/otp/send/", {
          phone_number: mobile,
        }),
      ]);

      setOtpStatus(true);
    } catch (err) {
      const message =
        (err as Error)?.message || "Something went wrong. Please try again.";

      setErrors({
        mobile: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const validateOtp = async (otp: string) => {
    if (otp.length !== 4) return;

    try {
      await apiCall("POST", "/api/v1/vendor-manager/user/create-checker/", {
        phone_number: mobile,
        name,
        otp,
      });

      setIsOtpCorrect(true);
      setOtpStatus(false);
    } catch {
      setIsOtpCorrect(false);
    }
  };

  if (isOtpCorrect) {
    return <CreateCheckerSuccessPage name={name} />;
  }

  return (
    <>
      {otpStatus ? (
        <OtpModal
          onClose={() => setOtpStatus(false)}
          onValidateOtp={validateOtp}
          isOtpCorrect={isOtpCorrect}
        />
      ) : (
        <>
          <Navbar title="CREATE CHECKER ACCOUNT" />

          <div className="w-full p-5">
            <div className="flex flex-col gap-2 mb-5">
              <label className="text-base">Mobile No :</label>
              <input
                type="text"
                placeholder="Enter Mobile No"
                value={mobile}
                onChange={(e) => handleMobileInput(e.target.value, setMobile)}
                className={`px-3 py-2 text-base border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2
                ${
                  errors.mobile
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />
              {errors.mobile && (
                <span className="text-sm text-red-500">{errors.mobile}</span>
              )}
            </div>

            <div className="flex flex-col gap-2 mb-12">
              <label className="text-base">Name :</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`px-3 py-2 text-base border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2
                ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />
              {errors.name && (
                <span className="text-sm text-red-500">{errors.name}</span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!mobile || !name || loading}
              className="w-full py-3 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader size={6} color="#fff" /> : "Create Account"}
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default CreateChecker;
