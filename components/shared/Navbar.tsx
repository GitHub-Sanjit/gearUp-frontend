"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/hooks/useAuth";

import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  User,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "../ui/button";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Gears",
    href: "/gears",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const { user, logout } = useAuth();

  const router = useRouter();

  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();

    toast.success("Logged out successfully");

    router.push("/login");
  };

  const dashboardPath =
    user?.role === "ADMIN"
      ? "/admin"
      : user?.role === "PROVIDER"
        ? "/provider"
        : "/dashboard";

  const profilePath =
    user?.role === "ADMIN"
      ? "/admin/profile"
      : user?.role === "PROVIDER"
        ? "/provider/profile"
        : "/dashboard/profile";

  return (
    <nav className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <Link href="/" className="text-2xl font-bold">
          GearUp
        </Link>

        {/* Navigation */}

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group relative rounded-sm text-sm font-medium
                  transition-colors hover:text-primary
                  ${isActive ? "text-primary" : "text-muted-foreground"}
                `}
              >
                {item.label}

                <span
                  className={`
                    absolute
                    -bottom-2
                    left-0
                    h-0.5
                    bg-primary
                    transition-all
                    duration-300
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                />
              </Link>
            );
          })}
        </div>

        {/* User Menu */}

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button
                className="
                    flex h-9 w-9 items-center justify-center
                    rounded-full bg-primary/10
                    transition hover:bg-primary/20
                  "
              >
                <User className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {/* User Information */}

              <div className="px-3 py-2">
                <p className="font-medium">{user.name}</p>

                <p className="text-xs text-muted-foreground">{user.email}</p>

                <p className="mt-1 text-xs font-semibold text-primary">
                  {user.role}
                </p>
              </div>

              <DropdownMenuSeparator />

              {/* Dashboard */}

              <DropdownMenuItem onClick={() => router.push(dashboardPath)}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </DropdownMenuItem>

              {/* Provider Menu */}

              {user.role === "PROVIDER" && (
                <>
                  <DropdownMenuItem
                    onClick={() => router.push("/provider/equipment")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    My Equipment
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => router.push("/provider/orders")}
                  >
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Rental Orders
                  </DropdownMenuItem>
                </>
              )}

              {/* Profile */}

              <DropdownMenuItem onClick={() => router.push(profilePath)}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              {/* Settings */}

              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Logout */}

              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
