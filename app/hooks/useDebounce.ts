import React, { useEffect, useState } from "react";
import { LoginFormData } from "../types/types";

const useDebounce = (value: LoginFormData, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
