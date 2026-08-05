import { axiosInstance } from "@/lib/axios";

export interface CreateRentalPayload {
  gearId: string;
  quantity: number;
  startDate: string;
  endDate: string;
}

export const createRental = async (payload: CreateRentalPayload) => {
  const response = await axiosInstance.post("/rentals", payload);

  return response.data.data.rental;
};

export const getMyRentals = async () => {
  const response = await axiosInstance.get("/rentals");

  return response.data.data.rentals;
};
