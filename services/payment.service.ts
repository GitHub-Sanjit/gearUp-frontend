import { axiosInstance } from "@/lib/axios";

import type {
  CreateCheckoutSessionPayload,
  CreateCheckoutSessionResponse,
  MyPaymentsResponse,
  ProviderPaymentsResponse,
} from "@/types/payment";

/**
 * Create a Stripe Checkout Session
 *
 * Backend:
 * POST /payments/checkout
 *
 * Body:
 * {
 *   rentalOrderId: string
 * }
 */
export const createCheckoutSession = async (
  payload: CreateCheckoutSessionPayload,
) => {
  const { data } = await axiosInstance.post<CreateCheckoutSessionResponse>(
    "/payments/checkout",
    payload,
  );

  return data;
};

/**
 * Get current customer's payment history
 *
 * Backend:
 * GET /payments/my-payments
 */
export const getMyPayments = async () => {
  const { data } = await axiosInstance.get<MyPaymentsResponse>(
    "/payments/my-payments",
  );

  return data;
};

/**
 * Get provider's payment history
 *
 * Backend:
 * GET /payments/provider-payments
 */
export const getProviderPayments = async () => {
  const { data } = await axiosInstance.get<ProviderPaymentsResponse>(
    "/payments/provider-payments",
  );

  return data;
};
