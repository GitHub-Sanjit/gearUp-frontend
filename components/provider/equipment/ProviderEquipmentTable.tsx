"use client";

import Image from "next/image";

import type { Gear } from "@/types/gear";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

interface Props {
  gears: Gear[];
}

export default function ProviderEquipmentTable({ gears }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>

            <TableHead>Name</TableHead>

            <TableHead>Category</TableHead>

            <TableHead>Price</TableHead>

            <TableHead>Stock</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Condition</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {gears.map((gear) => (
            <TableRow key={gear.id}>
              <TableCell>
                {gear.image ? (
                  <Image
                    src={gear.image}
                    alt={gear.name}
                    width={48}
                    height={48}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-xs">
                    N/A
                  </div>
                )}
              </TableCell>

              <TableCell>
                <div>
                  <p className="font-medium">{gear.name}</p>

                  {gear.brand && (
                    <p className="text-sm text-muted-foreground">
                      {gear.brand}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell>{gear.category?.name ?? "N/A"}</TableCell>

              <TableCell>${gear.dailyRentalPrice}/day</TableCell>

              <TableCell>
                {gear.availableQuantity}/{gear.stockQuantity}
              </TableCell>

              <TableCell>
                <Badge variant={gear.isAvailable ? "default" : "secondary"}>
                  {gear.isAvailable ? "Available" : "Unavailable"}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge variant="outline">{gear.condition}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
