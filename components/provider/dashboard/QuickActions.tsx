import Link from "next/link";

import { PlusCircle, Package, ClipboardList, UserCircle } from "lucide-react";

const actions = [
  {
    title: "Add Equipment",
    description: "Create a new gear listing",
    href: "/provider/equipment",
    icon: PlusCircle,
  },
  {
    title: "Manage Equipment",
    description: "Update your existing listings",
    href: "/provider/equipment",
    icon: Package,
  },
  {
    title: "Rental Requests",
    description: "Review customer rental orders",
    href: "/provider/orders",
    icon: ClipboardList,
  },
  {
    title: "Profile Settings",
    description: "Manage your account",
    href: "/provider/profile",
    icon: UserCircle,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">Quick Actions</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your rental business quickly
        </p>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-lg border p-4 transition hover:border-primary hover:shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h3 className="font-medium group-hover:text-primary">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
