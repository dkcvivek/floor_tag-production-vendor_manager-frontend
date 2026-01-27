"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/pwa/registerSW";

export default function PWAInit() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
}
