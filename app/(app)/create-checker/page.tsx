"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import { CreateCheckerFormError } from "@/app/types/types";
import { handleMobileInput } from "@/app/lib/helper";
import OtpModal from "@/app/components/OtpModal";
import CreateCheckerSuccessPage from "@/app/components/create-checker-success";

function CreateChecker() {
  const [mobile, setMobile] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [otpStatus, setOtpStatus] = useState<boolean>(false);
  const [isOtpCorrect, setIsOtpCorrecttus] = useState<boolean>(false);

  const [errors, setErrors] = useState<CreateCheckerFormError>({});

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

  const handleSubmit = () => {
    if (!validateForm()) return;

    console.log("Form Data:", { mobile, name });
  };

  const validateOtp = (otp: string) => {
    if (otp.length === 6) {
      console.log("Validate OTP:", otp);
    }
  };

  if (isOtpCorrect) {
    return <CreateCheckerSuccessPage />;
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
          <Navbar title={"CREATE CHECKER ACCOUNT"} />

          <div className="w-full p-5">
            <div className="flex flex-col gap-2 mb-5">
              <label className="text-base">Mobile No :</label>
              <input
                type="text"
                placeholder="Search Mobile No"
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
                placeholder="Search Name"
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
              className="w-full py-3 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!mobile || !name}
            >
              SEND OTP
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default CreateChecker;
