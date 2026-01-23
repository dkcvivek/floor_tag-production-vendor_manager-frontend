"use client";

import React, { useEffect, useRef, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
// import { useGeneralApiCall } from "@/apiServices/useGenralApiCall"; 

const ScanQR = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("OOPS Wrong QR");
  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment",
  );

  // const { getApi } = useGeneralApiCall();

  const scanLockRef = useRef(false);

  const handleScan = async (detectedCodes: any[]) => {};

  const handleError = (err: any) => {
    console.error(err);
    setError("Camera access denied or not available.");
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  const handleModal = () => {
    setShowModal(false);
    router.push(`/style-list`);
  };

  useEffect(() => {
    if (!showModal || !modalMessage) return;

    const utter = new SpeechSynthesisUtterance(modalMessage);
    utter.rate = 0.9;
    utter.pitch = 1;
    speechSynthesis.speak(utter);
  }, [showModal, modalMessage]);

  return (
    <>
      {showModal ? (
        <>
          <div className="absolute inset-0 bg-white z-30 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-red-600">Error</h3>

            <p className="mt-2 text-gray-800 text-base">{modalMessage}</p>

            <img
              src="/images/error.gif"
              alt="error animation"
              className="w-40 mx-auto mt-4"
            />

            <button
              onClick={handleModal}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="fixed inset-0 z-50 bg-black">
            {/* 1. Top Bar Controls (Floating over camera) */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20">
              {/* Cancel / Back Button */}
              <button
                onClick={() => router.push("/")}
                className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Flip Camera Button */}
              <button
                onClick={switchCamera}
                className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </div>

            {/* 2. Full Screen Scanner */}
            <div className="absolute inset-0 z-10">
              {error ? (
                <div className="flex items-center justify-center h-full text-white p-4 text-center">
                  <p className="bg-red-500/80 p-4 rounded-lg">{error}</p>
                </div>
              ) : (
                <Scanner
                  key={facingMode}
                  onScan={handleScan}
                  onError={handleError}
                  constraints={{
                    facingMode: facingMode,
                  }}
                  formats={["qr_code"]}
                  components={{
                    // Turn off built-in audio/torch UI to keep it clean
                    torch: true,
                    finder: true, // Keep the box frame so user knows where to aim
                  }}
                  styles={{
                    container: { width: "100%", height: "100%" },
                    video: {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    },
                  }}
                />
              )}
            </div>

            {/* 3. Bottom Hint Text (Optional) */}
            <div className="absolute bottom-10 left-0 right-0 z-20 text-center pointer-events-none">
              <p className="text-white/80 text-sm bg-black/30 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
                Align QR code to scan
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ScanQR;
