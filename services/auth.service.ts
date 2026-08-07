import { axiosInstance } from "@/lib/axios";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  name: string;
  bio?: string;
  profilePhoto?: string;
}

export const authService = {
  register: async (data: RegisterPayload) => {
    const response = await axiosInstance.post("/users/register", data);

    return response.data;
  },

  login: async (data: LoginPayload) => {
    const response = await axiosInstance.post("/auth/login", data);

    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post("/auth/logout");

    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get("/users/me");

    return response.data;
  },

  updateProfile: async (data: UpdateProfilePayload) => {
    const response = await axiosInstance.patch("/users/me", data);

    return response.data;
  },
};
