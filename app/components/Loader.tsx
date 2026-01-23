"use client";

import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="h-16 w-16 rounded-full border-4 border-blue-500/30 border-t-blue-600 animate-spin" />

        <span className="mt-2 ml-3 text-xl font-medium text-blue-600 translate-x-px">
          Loading...
        </span>
      </div>
    </div>
  );
}
