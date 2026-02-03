import axios from "axios";
import { setupAxiosInterceptors } from "./axiosInterceptor";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/";
export const TIMEOUT = 15000;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

setupAxiosInterceptors();