import { axiosInstance } from "@/lib/axios";

export interface CreateRentalPayload {
  gearId: string;
  quantity: number;
  startDate: string;
  endDate: string;
}

export const createRental = async (payload: CreateRentalPayload) => {
  const { data } = await axiosInstance.post("/rentals", payload);

  return data;
};

export const getMyRentals = async () => {
  const response = await axiosInstance.get("/rentals");

  return response.data.data.rentals;
};

// import { axiosInstance } from "@/lib/axios";

// export interface CreateRentalPayload {
//   gearId: string;
//   startDate: string;
//   endDate: string;
//   quantity: number;
// }

// export const createRental = async (payload: CreateRentalPayload) => {
//   const { data } = await axiosInstance.post("/rentals", payload);

//   return data;
// };
