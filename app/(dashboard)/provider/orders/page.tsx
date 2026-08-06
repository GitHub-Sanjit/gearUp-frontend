"use client";

import EmptyOrders from "@/components/provider/orders/EmptyOrders";
import LoadingSkeleton from "@/components/provider/orders/LoadingSkeleton";
import ProviderOrdersTable from "@/components/provider/orders/ProviderOrdersTable";
import { useProviderOrders } from "@/hooks/useRentals";

export default function ProviderOrdersPage() {
  const { data, isLoading, isError } = useProviderOrders();

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-bold">Rental Orders</h1>

          <p className="text-muted-foreground">
            Manage customer rental requests.
          </p>
        </div>

        <LoadingSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-destructive">Failed to load rental orders.</p>
      </div>
    );
  }

  const orders = data?.data.orders ?? [];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Rental Orders</h1>

        <p className="text-muted-foreground">
          Review and manage customer rental requests.
        </p>
      </div>

      {orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <ProviderOrdersTable orders={orders} />
      )}
    </div>
  );
}
