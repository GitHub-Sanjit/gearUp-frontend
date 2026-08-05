"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/hooks/useAuth";

import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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

const userMenuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    action: "dashboard",
  },
  {
    label: "Profile",
    icon: User,
    action: "profile",
  },
  {
    label: "Settings",
    icon: Settings,
    action: "settings",
  },
];

export default function Navbar() {
  const { user, logout } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const handleDashboardRedirect = () => {
    if (!user) return;

    switch (user.role) {
      case "ADMIN":
        router.push("/admin");
        break;

      case "PROVIDER":
        router.push("/provider");
        break;

      case "CUSTOMER":
        router.push("/dashboard");
        break;

      default:
        router.push("/");
    }
  };

  const handleLogout = async () => {
    await logout();

    toast.success("Logged out successfully");

    router.push("/login");
  };

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}

          <Link href="/" className="text-2xl font-bold">
            GearUp
          </Link>

          {/* Navigation */}

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group
          relative text-sm font-medium
          transition-colors duration-200
          hover:text-primary
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary
          focus-visible:ring-offset-2
          rounded-sm
          ${isActive ? "text-primary" : "text-muted-foreground"}
        `}
                >
                  {item.label}

                  {/* Active underline */}
                  <span
                    className={`
            absolute
            left-0
            -bottom-2
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

          {/* User Section */}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-medium">{user.name}</p>

                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {userMenuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <DropdownMenuItem
                      key={item.action}
                      onClick={
                        item.action === "dashboard"
                          ? handleDashboardRedirect
                          : undefined
                      }
                    >
                      <Icon className="mr-2 h-4 w-4" />

                      {item.label}
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuSeparator />

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
      </div>
    </nav>
  );
}
