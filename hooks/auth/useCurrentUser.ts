"use client";

import { authService } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: authService.getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};