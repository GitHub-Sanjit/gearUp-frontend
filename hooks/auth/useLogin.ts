"use client";

import { authService, LoginPayload } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginPayload) => authService.login(data),
  });
};