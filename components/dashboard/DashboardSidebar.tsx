"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  CalendarCheck,
  Settings,
  User,
  CreditCard,
} from "lucide-react";

type Role = "ADMIN" | "PROVIDER" | "CUSTOMER";

interface DashboardSidebarProps {
  role: Role;
}

const sidebarItems = {
  ADMIN: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Equipment",
      href: "/admin/equipment",
      icon: Package,
    },
    {
      title: "Bookings",
      href: "/admin/bookings",
      icon: CalendarCheck,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ],

  PROVIDER: [
    {
      title: "Dashboard",
      href: "/provider",
      icon: LayoutDashboard,
    },
    {
      title: "My Equipment",
      href: "/provider/equipment",
      icon: Package,
    },
    {
      title: "Rental Requests",
      href: "/provider/orders",
      icon: ShoppingCart,
    },
    {
      title: "Profile",
      href: "/provider/profile",
      icon: User,
    },
  ],

  CUSTOMER: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Browse Equipment",
      href: "/gears",
      icon: Package,
    },
    {
      title: "My Rentals",
      href: "/dashboard/rentals",
      icon: CalendarCheck,
    },
    {
      title: "Payments",
      href: "/dashboard/payments",
      icon: CreditCard,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ],
};

export default function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();

  const items = sidebarItems[role];

  return (
    <aside className="w-64 min-h-screen border-r p-5">
      <h2 className="mb-8 text-xl font-bold">GearUp</h2>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 transition ${
                active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <Icon size={18} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
