"use client";

import { PulseLoader } from "react-spinners";

type LoaderProps = {
  fullscreen?: boolean;
  size?: number;
  color?: string;
};

export default function FetchDataWithLoader({
  fullscreen = false,
  size = 15,
  color = "#1E90FF",
}: LoaderProps) {
  if (fullscreen) {
    return (
      <div className="min-h-dvh w-full flex items-center justify-center">
        <PulseLoader color={color} size={size} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <PulseLoader color={color} size={size} />
    </div>
  );
}
