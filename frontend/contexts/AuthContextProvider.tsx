"use client";

import { getSessionUser, logout } from "@/lib/auth/auth";
import { User } from "@/types/auth/auth-user";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  sessionLogout: () => void;
  setSessionUser: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const sessionLogout = () => {
    logout();
    setUser(null);
  };

  const fetchSessionUser = async () => {
    try {
      const res = await getSessionUser();
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const setSessionUser = async () => {
    await fetchSessionUser();
  };

  useEffect(() => {
    void fetchSessionUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, sessionLogout, setSessionUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
