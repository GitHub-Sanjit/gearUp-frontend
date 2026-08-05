import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import type { GearResponse } from "@/types/gear";

export interface GearQuery {
  search?: string;
  categoryId?: string;
  brand?: string;
  isAvailable?: boolean;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const useGears = (params?: GearQuery) => {
  return useQuery({
    queryKey: ["gears", params],

    queryFn: async () => {
      const response = await axiosInstance.get<GearResponse>("/gear", {
        params,
      });

      return response.data;
    },
  });
};
