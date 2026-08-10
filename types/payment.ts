import type { RentalStatus } from "./rental";

export type PaymentProvider = "STRIPE" | "SSLCOMMERZ";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface PaymentGear {
  id: string;
  name: string;
  brand: string | null;
  image: string | null;
  category?: {
    id: string;
    name: string;
  };
}

export interface MyPaymentRental {
  id: string;
  status: RentalStatus;
  startDate: string;
  endDate: string;
  totalAmount: number;
  gear: PaymentGear;
}

export interface MyPayment {
  id: string;
  amount: number;
  provider: PaymentProvider;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;

  rentalOrder: MyPaymentRental;
}

export interface ProviderPaymentCustomer {
  id: string;
  name: string;
  email: string;
}

export interface ProviderPaymentRental {
  id: string;
  startDate: string;
  endDate: string;
  totalAmount: number;

  customer: ProviderPaymentCustomer;

  gear: {
    id: string;
    name: string;
    brand: string | null;
    image: string | null;
  };
}

export interface ProviderPayment {
  id: string;
  amount: number;
  provider: PaymentProvider;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;

  rentalOrder: ProviderPaymentRental;
}

export interface CreateCheckoutSessionPayload {
  rentalOrderId: string;
}

export interface CreateCheckoutSessionResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    paymentUrl: string;
  };
}

export interface MyPaymentsResponse {
  success: boolean;
  statusCode?: number;
  message: string;

  data: MyPayment[];
}

export interface ProviderPaymentsResponse {
  success: boolean;
  statusCode?: number;
  message: string;

  data: ProviderPayment[];
}

export interface AllPaymentsMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface AllPaymentsResponse {
  success: boolean;
  statusCode?: number;
  message: string;

  meta: AllPaymentsMeta;

  data: Array<{
    id: string;
    amount: number;
    provider: PaymentProvider;
    status: PaymentStatus;
    stripeCustomerId?: string | null;
    stripeSessionId?: string | null;
    transactionId?: string | null;
    paidAt: string | null;
    createdAt: string;
    updatedAt: string;

    rentalOrder: {
      id: string;
      startDate: string;
      endDate: string;
      totalAmount: number;

      customer: {
        id: string;
        name: string;
        email: string;
      };

      gear: {
        id: string;
        name: string;
        brand: string | null;
        image: string | null;

        category: {
          id: string;
          name: string;
        };

        provider: {
          id: string;
          name: string;
          email: string;
        };
      };
    };
  }>;
}