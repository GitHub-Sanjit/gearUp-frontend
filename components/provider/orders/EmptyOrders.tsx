"use client";

import { ClipboardList } from "lucide-react";

export default function EmptyOrders() {
  return (
    <div className="flex min-h-75 flex-col items-center justify-center rounded-md border border-dashed">
      <div className="mb-4 rounded-full bg-muted p-4">
        <ClipboardList className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="text-lg font-semibold">No Rental Orders Found</h3>

      <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
        You don&apos;t have any rental orders yet. New customer rentals will
        appear here.
      </p>
    </div>
  );
}
