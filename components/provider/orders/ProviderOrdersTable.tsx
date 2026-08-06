"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ProviderOrderRow from "./ProviderOrderRow";

import { RentalOrder } from "@/types/rental";

interface ProviderOrdersTableProps {
  orders: RentalOrder[];
}

export default function ProviderOrdersTable({
  orders,
}: ProviderOrdersTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Gear</TableHead>

            <TableHead>Customer</TableHead>

            <TableHead>Rental Period</TableHead>

            <TableHead>Quantity</TableHead>

            <TableHead>Amount</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="text-center">
              <div className="flex flex-col items-center gap-1">
                <span>Actions</span>

                <span className="text-xs font-normal text-muted-foreground">
                  Next Step
                </span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <ProviderOrderRow key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
