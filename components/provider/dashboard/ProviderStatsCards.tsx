import { Package, CheckCircle2, ClipboardList, Wallet } from "lucide-react";

interface ProviderStatsCardsProps {
  totalGear: number;
  activeGear: number;
  totalRequests: number;
  revenue: number;
}

const stats = [
  {
    key: "totalGear",
    title: "Total Equipment",
    icon: Package,
    description: "Equipment listed",
  },
  {
    key: "activeGear",
    title: "Active Listings",
    icon: CheckCircle2,
    description: "Currently available",
  },
  {
    key: "totalRequests",
    title: "Rental Requests",
    icon: ClipboardList,
    description: "Customer requests",
  },
  {
    key: "revenue",
    title: "Total Earnings",
    icon: Wallet,
    description: "Completed rentals",
  },
];

export default function ProviderStatsCards({
  totalGear,
  activeGear,
  totalRequests,
  revenue,
}: ProviderStatsCardsProps) {
  const values: Record<string, number> = {
    totalGear,
    activeGear,
    totalRequests,
    revenue,
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.key}
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>

                <h2 className="mt-2 text-3xl font-bold">
                  {stat.key === "revenue"
                    ? `৳${values[stat.key].toLocaleString()}`
                    : values[stat.key]}
                </h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>

              <div className="rounded-full bg-primary/10 p-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
