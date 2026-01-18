"use server";
import { ApiRoutes } from "@/constants/routes";
import { api } from "@/lib/api";
import { ApiError } from "@/types/api";
import { cookies } from "next/headers";

export const getSessionAccessToken = async () => {
  const token = (await cookies()).get("access_token")?.value;
  return token;
};

export const getAuthorizationHeaders = async () => {
  const token = await getSessionAccessToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return headers;
};

export const getServerSideSessionUser = async () => {
  try {
    const token = await getSessionAccessToken();
    const res = await api.get(ApiRoutes.AUTH.meUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    };
  }
};
