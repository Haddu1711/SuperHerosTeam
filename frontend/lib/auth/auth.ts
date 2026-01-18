import Cookies from "js-cookie";
import { api } from "../api";

export async function login(username: string, password: string) {
  const res = await api.post("/auth/login/", { username, password });

  Cookies.set("access_token", res.data.access, {
    sameSite: "lax",
  });

  return res;
}

export async function register(
  username: string,
  email: string,
  password: string,
) {
  const res = await api.post("/auth/register/", { username, email, password });
  return res;
}

export function logout() {
  Cookies.remove("access_token");
}
