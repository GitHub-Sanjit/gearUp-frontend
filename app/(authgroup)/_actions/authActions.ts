/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { authService } from "@/services/auth.service";
import { redirect } from "next/navigation";

export async function loginAction(
  redirectTo: string,
  _previousState: unknown,
  formData: FormData,
) {
  try {
    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const response = await authService.login(payload);

    if (!response.success) {
      return {
        success: false,
        message: response.message || "Login failed",
      };
    }

    redirect(redirectTo || "/dashboard");
  } catch (error) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}

export async function registerAction(
  _previousState: unknown,
  formData: FormData,
) {
  try {
    const profilePhoto = formData.get("profilePhoto") as string;

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as "CUSTOMER" | "PROVIDER",
      ...(profilePhoto && { profilePhoto }),
    };

    const response = await authService.register(payload);

    if (!response.success) {
      return {
        success: false,
        message: response.message || "Registration failed",
      };
    }
    return {
      success: true,
      message: response.message || "Registration successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
