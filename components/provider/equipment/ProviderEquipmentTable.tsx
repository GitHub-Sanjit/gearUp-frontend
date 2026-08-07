"use client";

import { useState } from "react";

import { normalizeImageUrl, FALLBACK_IMAGE } from "@/utils/image";
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
import { Button } from "@/components/ui/button";

import { Pencil, Trash2 } from "lucide-react";

interface Props {
  gears: Gear[];

  onEdit?: (gear: Gear) => void;

  onDelete?: (gear: Gear) => void;
}

export default function ProviderEquipmentTable({
  gears,
  onEdit,
  onDelete,
}: Props) {
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

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {gears.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="h-24 text-center text-muted-foreground"
              >
                No equipment found.
              </TableCell>
            </TableRow>
          ) : (
            gears.map((gear) => (
              <EquipmentRow
                key={gear.id}
                gear={gear}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function EquipmentRow({
  gear,
  onEdit,
  onDelete,
}: {
  gear: Gear;
  onEdit?: (gear: Gear) => void;
  onDelete?: (gear: Gear) => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <TableRow>
      {/* Image */}
      <TableCell>
        <img
          src={imageError ? FALLBACK_IMAGE : normalizeImageUrl(gear.image)}
          alt={gear.name}
          className="h-12 w-12 rounded-md object-cover"
          onError={() => setImageError(true)}
        />
      </TableCell>

      {/* Name */}
      <TableCell>
        <div>
          <p className="font-medium">{gear.name}</p>

          {gear.brand && (
            <p className="text-sm text-muted-foreground">{gear.brand}</p>
          )}
        </div>
      </TableCell>

      {/* Category */}
      <TableCell>{gear.category?.name ?? "N/A"}</TableCell>

      {/* Price */}
      <TableCell>${gear.dailyRentalPrice}/day</TableCell>

      {/* Stock */}
      <TableCell>
        {gear.availableQuantity}/{gear.stockQuantity}
      </TableCell>

      {/* Status */}
      <TableCell>
        <Badge variant={gear.isAvailable ? "default" : "secondary"}>
          {gear.isAvailable ? "Available" : "Unavailable"}
        </Badge>
      </TableCell>

      {/* Condition */}
      <TableCell>
        <Badge variant="outline">{gear.condition}</Badge>
      </TableCell>

      {/* Actions */}
      <TableCell>
        <div className="flex justify-end gap-2">
          <Button size="icon" variant="outline" onClick={() => onEdit?.(gear)}>
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="destructive"
            onClick={() => onDelete?.(gear)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
