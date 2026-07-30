"use client";

import { createContext, useEffect, useState } from "react";

import { authService } from "@/services/auth.service";
import type { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const response = await authService.getCurrentUser();

      console.log("ME RESPONSE:", response);

      setUser(response.data.profile);
    } catch (error) {
      console.log("AUTH ERROR:", error);

      setUser(null);
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
