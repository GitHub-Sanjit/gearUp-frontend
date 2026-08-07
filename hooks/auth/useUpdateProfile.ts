/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import type { UpdateProfilePayload } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";

export const useUpdateProfile = () => {
  const { refreshUser } = useAuth();

  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => authService.updateProfile(data),

    onSuccess: async () => {
      await refreshUser();

      toast.success("Profile updated successfully");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });
};
