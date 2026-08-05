// lib/axios.ts

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.log("Unauthorized");
      // TODO:
      // 1. Call /auth/refresh-token
      // 2. Retry the original request
      // 3. If refresh fails, redirect to login
    }

    return Promise.reject(error);
  },
);
