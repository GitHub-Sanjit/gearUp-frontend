"use client";

import { authService, RegisterPayload } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterPayload) => authService.register(data),
  });
};