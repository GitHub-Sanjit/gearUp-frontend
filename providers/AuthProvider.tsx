/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useEffect, useState } from "react";

import { authService } from "@/services/auth.service";
import type { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User | null>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async (): Promise<User | null> => {
    setIsLoading(true);

    try {
      const data = await authService.getCurrentUser();

      console.log("GET CURRENT USER:", data);
      console.log("PROFILE:", data.profile);
      console.log("DATA PROFILE:", data.data?.profile);

      setUser(data.data);

      return data.data;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  useEffect(() => {
    const initAuth = async () => {
      await refreshUser();
    };

    initAuth();
  }, []);

  console.log("CURRENT USER:", user);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
