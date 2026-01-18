import { ApiError } from "@/types/api";
import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      message: "Request failed",
      status: error.response?.status ?? 500,
    };

    const data = error.response?.data;

    if (data && typeof data === "object") {
      apiError.fieldErrors = data;

      if (data.non_field_errors?.length) {
        apiError.message = data.non_field_errors[0];
      }
    }

    return Promise.reject(apiError);
  },
);
