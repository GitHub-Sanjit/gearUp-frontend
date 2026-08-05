import { axiosInstance } from "@/lib/axios";
import type { GearResponse, Gear } from "@/types/gear";

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

export const getGearById = async (id: string) => {
  const { data } = await axiosInstance.get<{
    data: {
      gear: Gear;
    };
  }>(`/gear/${id}`);

  return data.data.gear;
};
