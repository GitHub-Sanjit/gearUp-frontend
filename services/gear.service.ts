import { axiosInstance } from "@/lib/axios";

export const gearService = {
  getAllGear: async (params?: Record<string, unknown>) => {
    const res = await axiosInstance.get("/gear", {
      params,
    });

    return res.data;
  },

  getGearById: async (id: string) => {
    const res = await axiosInstance.get(`/gear/${id}`);

    return res.data;
  },

  getCategories: async () => {
    const res = await axiosInstance.get("/categories");

    return res.data;
  },
};
