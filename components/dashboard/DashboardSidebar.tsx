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
      href: "/dashboard/equipment",
      icon: Package,
    },
    {
      title: "My Bookings",
      href: "/dashboard/bookings",
      icon: CalendarCheck,
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
    <aside className="w-64 border-r min-h-screen p-5">
      <h2 className="text-xl font-bold mb-8">GearUp</h2>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

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
