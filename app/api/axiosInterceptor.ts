import axios from "axios";
import { axiosInstance, BASE_URL } from "./axiosInstance";

let initialized = false;

const clearTokenData = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const setupAxiosInterceptors = () => {
  if (initialized) return;
  initialized = true;

  axiosInstance.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) config.headers.Authorization = `Token ${token}`;
    }

    if (config.headers && !config.headers["Content-Type"]) {
      if (config.data instanceof FormData)
        delete config.headers["Content-Type"];
      else config.headers["Content-Type"] = "application/json";
    }

    config.headers.Accept = "application/json";
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.data?.error_status === true) {
        return Promise.reject(
          new Error(response.data.message || "Something went wrong"),
        );
      }
      return response;
    },
    async (error) => {
      if (error.response?.status === 401) {
        clearTokenData();
        window.location.href = "/login";
      }

      return Promise.reject(error);
    },
  );
};
