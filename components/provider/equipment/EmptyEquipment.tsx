import { PackageOpen } from "lucide-react";

export default function EmptyEquipment() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
      <PackageOpen className="mb-4 h-12 w-12 text-muted-foreground" />

      <h2 className="text-xl font-semibold">No Equipment Added</h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Start adding equipment to make it available for rental.
      </p>
    </div>
  );
}
