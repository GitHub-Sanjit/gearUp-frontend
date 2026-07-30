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

export const authService = {
  // register: async (data: RegisterPayload) => {
  //   const response = await axiosInstance.post("/auth/register", data);

  //   return response.data;
  // },

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
    const res = await axiosInstance.get("/users/me");

    return res.data;
  },
};
