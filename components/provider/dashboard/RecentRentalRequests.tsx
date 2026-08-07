import { CalendarDays, User } from "lucide-react";

import type { RentalOrder } from "@/types/rental";

interface RecentRentalRequestsProps {
  orders: RentalOrder[];
}

const statusStyles: Record<string, string> = {
  PLACED: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PAID: "bg-purple-100 text-purple-700",
  PICKED_UP: "bg-indigo-100 text-indigo-700",
  RETURNED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function RecentRentalRequests({
  orders,
}: RecentRentalRequestsProps) {
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">Recent Rental Requests</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Latest customer rental activities
        </p>
      </div>

      <div className="p-6">
        {recentOrders.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-muted-foreground">No rental requests yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
              >
                {/* Customer + Gear */}
                <div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />

                    <p className="font-medium">
                      {order.customer?.name ?? "Unknown Customer"}
                    </p>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {order.gear.name}
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="h-3 w-3" />
                    {new Date(order.startDate).toLocaleDateString()} -{" "}
                    {new Date(order.endDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Amount + Status */}
                <div className="flex flex-col items-start gap-2 md:items-end">
                  <p className="font-semibold">
                    ৳{order.totalAmount.toLocaleString()}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
