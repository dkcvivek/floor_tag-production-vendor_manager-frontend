"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);
};
