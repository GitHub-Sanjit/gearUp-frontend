/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateCheckoutSession } from "@/hooks/usePayments";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PayNowButtonProps {
  rentalOrderId: string;
}

export default function PayNowButton({ rentalOrderId }: PayNowButtonProps) {
  const { mutateAsync, isPending } = useCreateCheckoutSession();

  const handlePayNow = async () => {
    try {
      const response = await mutateAsync({
        rentalOrderId,
      });

      const paymentUrl = response.data?.paymentUrl;

      if (!paymentUrl) {
        toast.error("Payment URL was not received.");
        return;
      }

      // Redirect the customer to Stripe Checkout
      window.location.href = paymentUrl;
    } catch (error: any) {
      console.error("Create checkout session error:", error);

      const message =
        error?.response?.data?.message ||
        "Unable to start payment. Please try again.";

      toast.error(message);
    }
  };

  return (
    <Button
      type="button"
      onClick={handlePayNow}
      disabled={isPending}
      className="w-full"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          Pay Now
        </>
      )}
    </Button>
  );
}
