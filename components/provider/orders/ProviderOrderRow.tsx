"use client";

import { CalendarDays, Package, User } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";

import ProviderStatusBadge from "./ProviderStatusBadge";
import UpdateRentalStatusDialog from "./UpdateRentalStatusDialog";

import { RentalOrder } from "@/types/rental";

interface ProviderOrderRowProps {
  order: RentalOrder;
}

export default function ProviderOrderRow({ order }: ProviderOrderRowProps) {
  const renderActions = () => {
    switch (order.status) {
      case "PLACED":
        return (
          <div className="flex justify-center gap-2">
            <UpdateRentalStatusDialog
              rentalId={order.id}
              status="CONFIRMED"
              buttonText="Confirm"
            />

            <UpdateRentalStatusDialog
              rentalId={order.id}
              status="CANCELLED"
              buttonText="Cancel"
              buttonVariant="destructive"
            />
          </div>
        );

      case "CONFIRMED":
        return (
          <div className="flex justify-center">
            <UpdateRentalStatusDialog
              rentalId={order.id}
              status="PICKED_UP"
              buttonText="Pick Up"
            />
          </div>
        );

      case "PICKED_UP":
        return (
          <div className="flex justify-center">
            <UpdateRentalStatusDialog
              rentalId={order.id}
              status="RETURNED"
              buttonText="Mark Returned"
            />
          </div>
        );

      default:
        return (
          <div className="flex justify-center">
            <Badge variant="secondary">✓ Completed</Badge>
          </div>
        );
    }
  };

  return (
    <TableRow>
      {/* Gear */}

      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-md bg-muted">
            {order.gear.image && (
              <Image
                src={order.gear.image}
                alt={order.gear.name}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div>
            <p className="font-medium">{order.gear.name}</p>

            <p className="text-sm text-muted-foreground">{order.gear.brand}</p>
          </div>
        </div>
      </TableCell>

      {/* Customer */}

      <TableCell>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />

          <div>
            <p className="font-medium">
              {order.customer?.name ?? "Unknown Customer"}
            </p>

            <p className="text-sm text-muted-foreground">
              {order.customer?.email ?? "No email"}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Rental Period */}

      <TableCell>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />

          <div className="text-sm">
            <p>{new Date(order.startDate).toLocaleDateString()}</p>

            <p>→ {new Date(order.endDate).toLocaleDateString()}</p>
          </div>
        </div>
      </TableCell>

      {/* Quantity */}

      <TableCell>
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />

          {order.quantity}
        </div>
      </TableCell>

      {/* Amount */}

      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>

      {/* Status */}

      <TableCell>
        <ProviderStatusBadge status={order.status} />
      </TableCell>

      {/* Actions */}

      <TableCell>{renderActions()}</TableCell>
    </TableRow>
  );
}
