import Cookies from "js-cookie";
import { api } from "../api";
import { ApiRoutes } from "@/constants/routes";
import { ApiError, ApiResponse } from "@/types/api";

export async function login(username: string, password: string) {
  try {
    const res = await api.post(ApiRoutes.AUTH.login, { username, password });

    Cookies.set("access_token", res.data.access, {
      sameSite: "lax",
    });

    return res;
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    };
  }
}

export async function register(
  username: string,
  email: string,
  password: string,
): Promise<ApiResponse> {
  try {
    const res = await api.post(ApiRoutes.AUTH.register, {
      username,
      email,
      password,
    });

    return res;
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    };
  }
}

export function logout() {
  Cookies.remove("access_token");
}

export const getSessionUser = async () => {
  try {
    const res = await api.get(ApiRoutes.AUTH.meUser);
    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    };
  }
};
