import { TrendingUp, CircleDollarSign } from "lucide-react";

import type { RentalOrder } from "@/types/rental";

interface RevenueCardProps {
  orders: RentalOrder[];
}

export default function RevenueCard({ orders }: RevenueCardProps) {
  const completedOrders = orders.filter((order) => order.status === "RETURNED");

  const totalRevenue = completedOrders.reduce(
    (sum, order) => sum + order.totalAmount,
    0,
  );

  const averageRentalValue =
    completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Revenue Overview</p>

          <h2 className="mt-2 text-3xl font-bold">
            ৳{totalRevenue.toLocaleString()}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            From completed rentals
          </p>
        </div>

        <div className="rounded-full bg-green-100 p-3">
          <CircleDollarSign className="h-7 w-7 text-green-600" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />

            <p className="text-sm font-medium">Completed</p>
          </div>

          <p className="mt-2 text-2xl font-semibold">
            {completedOrders.length}
          </p>

          <p className="text-xs text-muted-foreground">Rentals finished</p>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm font-medium">Avg. Rental</p>

          <p className="mt-2 text-2xl font-semibold">
            ৳{Math.round(averageRentalValue).toLocaleString()}
          </p>

          <p className="text-xs text-muted-foreground">Per completed order</p>
        </div>
      </div>
    </div>
  );
}
