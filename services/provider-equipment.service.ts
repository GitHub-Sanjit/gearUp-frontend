import { axiosInstance } from "@/lib/axios";
import type { Gear } from "@/types/gear";

interface MyGearResponse {
  data: {
    gears: Gear[];
  };
}

export const getMyEquipment = async () => {
  const { data } = await axiosInstance.get<MyGearResponse>("/my-gear");

  return data.data.gears;
};

export const deleteEquipment = async (id: string) => {
  const { data } = await axiosInstance.delete(`/gear/${id}`);

  return data;
};

export interface CreateEquipmentPayload {
  name: string;

  description?: string;

  brand?: string;

  image?: string;

  dailyRentalPrice: number;

  stockQuantity: number;

  availableQuantity: number;

  categoryId: string;

  condition?: "GOOD" | "FAIR" | "POOR";
}

export const createEquipment = async (payload: CreateEquipmentPayload) => {
  const { data } = await axiosInstance.post("/gear", payload);

  return data;
};
