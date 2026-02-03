import { ApiResponse } from "../types/apiResponse";
import { axiosInstance } from "./axiosInstance";

export const apiCall = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: Record<string, unknown> | FormData | null,
  params?: Record<string, unknown>,
): Promise<ApiResponse<T>> => {
  const isFormData = data instanceof FormData;

  const response = await axiosInstance.request<ApiResponse<T>>({
    method,
    url,
    data: isFormData ? data : data,
    params,
  });

  return response.data;
};

