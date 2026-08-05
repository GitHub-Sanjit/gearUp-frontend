import { Gear } from "./gear";
import { User } from "./user";

export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

export interface Payment {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface RentalOrder {
  id: string;

  customerId: string;
  customer?: User;

  gearId: string;
  gear: Gear;

  startDate: string;
  endDate: string;

  quantity: number;

  totalDays: number;

  totalAmount: number;

  status: RentalStatus;

  isPaid: boolean;

  payment?: Payment | null;

  createdAt: string;

  updatedAt: string;
}

export interface CreateRentalOrderPayload {
  gearId: string;

  startDate: string;

  endDate: string;

  quantity: number;
}

export interface UpdateRentalStatusPayload {
  status: RentalStatus;
}

// API Responses

export interface CreateRentalResponse {
  success: boolean;

  message: string;

  data: {
    rental: RentalOrder;
  };
}

export interface MyRentalsResponse {
  success: boolean;

  message: string;

  data: {
    rentals: RentalOrder[];
  };
}

export interface SingleRentalResponse {
  success: boolean;

  message: string;

  data: {
    rental: RentalOrder;
  };
}

export interface ProviderOrdersResponse {
  success: boolean;

  message: string;

  data: {
    orders: RentalOrder[];
  };
}
