import axios from "axios";
import { axiosInstance, BASE_URL } from "./axiosInstance";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve(token!);
  });
  failedQueue = [];
};

const clearTokenData = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const setupAxiosInterceptors = () => {
  axiosInstance.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
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
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refresh = localStorage.getItem("refresh_token");
        if (!refresh) {
          clearTokenData();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        try {
          const res = await axios.post(`${BASE_URL}/auth/token/refresh/`, {
            refresh,
          });

          const newToken = res.data?.data?.access;
          localStorage.setItem("access_token", newToken);
          processQueue(null, newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          processQueue(err, null);
          clearTokenData();
          window.location.href = "/login";
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};