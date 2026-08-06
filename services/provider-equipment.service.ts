import { axiosInstance } from "@/lib/axios";

import type { Gear } from "@/types/gear";

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

export interface UpdateEquipmentPayload {
  name?: string;

  description?: string;

  brand?: string;

  image?: string;

  dailyRentalPrice?: number;

  stockQuantity?: number;

  availableQuantity?: number;

  categoryId?: string;

  condition?: "GOOD" | "FAIR" | "POOR";
}

export const getMyEquipment = async (): Promise<Gear[]> => {
  const { data } = await axiosInstance.get("/provider/my-gear");

  return data.data.gears;
};

export const createEquipment = async (payload: CreateEquipmentPayload) => {
  const { data } = await axiosInstance.post("/provider/gear", payload);

  return data;
};

export const updateEquipment = async (
  id: string,
  payload: UpdateEquipmentPayload,
) => {
  const { data } = await axiosInstance.patch(`/provider/gear/${id}`, payload);

  return data;
};

export const deleteEquipment = async (id: string) => {
  const { data } = await axiosInstance.delete(`/provider/gear/${id}`);

  return data;
};
