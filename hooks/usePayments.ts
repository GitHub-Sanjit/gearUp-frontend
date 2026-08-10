"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createCheckoutSession,
  getMyPayments,
  getProviderPayments,
} from "@/services/payment.service";

import type { CreateCheckoutSessionPayload } from "@/types/payment";

// =====================================
// CUSTOMER
// =====================================

/**
 * Create Stripe Checkout Session
 *
 * The backend returns a Stripe payment URL.
 * We redirect the browser to that URL.
 */
export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: (payload: CreateCheckoutSessionPayload) =>
      createCheckoutSession(payload),
  });
};

/**
 * Get customer's payment history
 */
export const useMyPayments = () => {
  return useQuery({
    queryKey: ["my-payments"],
    queryFn: getMyPayments,
  });
};

// =====================================
// PROVIDER
// =====================================

/**
 * Get provider's payment history
 */
export const useProviderPayments = () => {
  return useQuery({
    queryKey: ["provider-payments"],
    queryFn: getProviderPayments,
  });
};
