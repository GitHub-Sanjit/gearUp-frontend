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

      const data = await authService.getCurrentUser();

      setUser(data.user);

    } catch(error) {

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

    let ignore = false;


    const loadUser = async () => {

      try {

        const data = await authService.getCurrentUser();

        if(!ignore){
          setUser(data.user);
        }

      } catch(error){

        if(!ignore){
          setUser(null);
        }

      } finally {

        if(!ignore){
          setIsLoading(false);
        }

      }

    };


    loadUser();


    return () => {
      ignore = true;
    };


  }, []);


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