import { Badge } from "@/components/ui/badge";

import { RentalStatus } from "@/types/rental";

interface ProviderStatusBadgeProps {
  status: RentalStatus;
}

export default function ProviderStatusBadge({
  status,
}: ProviderStatusBadgeProps) {
  const getVariantClasses = () => {
    switch (status) {
      case "PLACED":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";

      case "CONFIRMED":
        return "bg-blue-100 text-blue-800 border-blue-300";

      case "PAID":
        return "bg-green-100 text-green-800 border-green-300";

      case "PICKED_UP":
        return "bg-orange-100 text-orange-800 border-orange-300";

      case "RETURNED":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";

      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-300";

      default:
        return "";
    }
  };

  return (
    <Badge
      variant="outline"
      className={`
        font-medium
        px-3
        py-1
        rounded-full
        ${getVariantClasses()}
      `}
    >
      {status.replace("_", " ")}
    </Badge>
  );
}
