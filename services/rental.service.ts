import { axiosInstance } from "@/lib/axios";

import {
  CreateRentalOrderPayload,
  CreateRentalResponse,
  MyRentalsResponse,
  ProviderOrdersResponse,
  SingleRentalResponse,
  UpdateRentalStatusPayload,
} from "@/types/rental";

export const createRentalOrder = async (payload: CreateRentalOrderPayload) => {
  const { data } = await axiosInstance.post<CreateRentalResponse>(
    "/rentals",
    payload,
  );

  return data;
};

export const getMyRentalOrders = async () => {
  const { data } = await axiosInstance.get<MyRentalsResponse>("/rentals");

  return data;
};

export const getRentalOrderById = async (id: string) => {
  const { data } = await axiosInstance.get<SingleRentalResponse>(
    `/rentals/${id}`,
  );

  return data;
};

export const getProviderOrders = async () => {
  const { data } = await axiosInstance.get<ProviderOrdersResponse>(
    "/rentals/provider/orders",
  );

  return data;
};

export const updateRentalStatus = async (
  id: string,
  payload: UpdateRentalStatusPayload,
) => {
  const { data } = await axiosInstance.patch(
    `/rentals/provider/orders/${id}`,
    payload,
  );

  return data;
};
