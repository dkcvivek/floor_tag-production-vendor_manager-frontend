"use client";

import { useEffect } from "react";
import { setupAxiosInterceptors } from "../api/axiosInterceptor";

export default function AxiosInit() {
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return null;
}
