"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              {/* Gear */}

              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-md" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />

                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </TableCell>

              {/* Customer */}

              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />

                  <Skeleton className="h-3 w-36" />
                </div>
              </TableCell>

              {/* Rental Period */}

              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />

                  <Skeleton className="h-3 w-24" />
                </div>
              </TableCell>

              {/* Quantity */}

              <TableCell>
                <Skeleton className="h-4 w-10" />
              </TableCell>

              {/* Amount */}

              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>

              {/* Status */}

              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>

              {/* Actions */}

              <TableCell>
                <Skeleton className="h-8 w-24" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
