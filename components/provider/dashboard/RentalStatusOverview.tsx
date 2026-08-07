import {
  ClipboardList,
  CheckCircle2,
  CreditCard,
  PackageCheck,
  RotateCcw,
  XCircle,
} from "lucide-react";

import type { RentalOrder, RentalStatus } from "@/types/rental";

interface RentalStatusOverviewProps {
  orders: RentalOrder[];
}

const statusConfig: {
  status: RentalStatus;
  label: string;
  icon: React.ElementType;
  description: string;
}[] = [
  {
    status: "PLACED",
    label: "Placed",
    icon: ClipboardList,
    description: "New requests",
  },
  {
    status: "CONFIRMED",
    label: "Confirmed",
    icon: CheckCircle2,
    description: "Approved rentals",
  },
  {
    status: "PAID",
    label: "Paid",
    icon: CreditCard,
    description: "Payment received",
  },
  {
    status: "PICKED_UP",
    label: "Picked Up",
    icon: PackageCheck,
    description: "Currently rented",
  },
  {
    status: "RETURNED",
    label: "Returned",
    icon: RotateCcw,
    description: "Completed rentals",
  },
  {
    status: "CANCELLED",
    label: "Cancelled",
    icon: XCircle,
    description: "Cancelled orders",
  },
];

export default function RentalStatusOverview({
  orders,
}: RentalStatusOverviewProps) {
  const getStatusCount = (status: RentalStatus) => {
    return orders.filter((order) => order.status === status).length;
  };

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">Rental Status Overview</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Track your rental workflow
        </p>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-3">
        {statusConfig.map((item) => {
          const Icon = item.icon;

          const count = getStatusCount(item.status);

          return (
            <div
              key={item.status}
              className="rounded-lg border p-4 transition hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-muted p-3">
                  <Icon className="h-5 w-5" />
                </div>

                <span className="text-3xl font-bold">{count}</span>
              </div>

              <h3 className="mt-4 font-medium">{item.label}</h3>

              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
