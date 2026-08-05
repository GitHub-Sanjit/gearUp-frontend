import { axiosInstance } from "@/lib/axios";
import { GearResponse } from "@/types/gear";

export const getFeaturedGears = async () => {
  const { data } = await axiosInstance.get<GearResponse>("/gear", {
    params: {
      limit: 6,
      sortBy: "createdAt",
      sortOrder: "desc",
    },
  });

  return data.data.gears;
};
