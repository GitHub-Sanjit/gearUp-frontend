"use client";

import ProviderStatsCards from "@/components/provider/dashboard/ProviderStatsCards";
import RevenueCard from "@/components/provider/dashboard/RevenueCard";
import RecentRentalRequests from "@/components/provider/dashboard/RecentRentalRequests";
import PopularEquipment from "@/components/provider/dashboard/PopularEquipment";
import DashboardSkeleton from "@/components/provider/dashboard/DashboardSkeleton";
import RentalStatusOverview from "@/components/provider/dashboard/RentalStatusOverview";

import { useProviderEquipment } from "@/hooks/useProviderEquipment";
import { useProviderOrders } from "@/hooks/useRentals";

export default function ProviderPage() {
  const {
    data: gears,
    isLoading: isGearLoading,
    isError: isGearError,
  } = useProviderEquipment();

  const {
    data: ordersResponse,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = useProviderOrders();

  const isLoading = isGearLoading || isOrdersLoading;

  const isError = isGearError || isOrdersError;

  if (isLoading) {
    return (
      <div className="p-10">
        <DashboardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10">
        <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-red-600">
            Failed to load dashboard
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong while fetching provider data.
          </p>
        </div>
      </div>
    );
  }

  /*
    Current API responses:

    useProviderEquipment()
        returns Gear[]

    useProviderOrders()
        returns:
        {
          success:true,
          data:{
            orders:[]
          }
        }
  */

  const equipment = gears ?? [];

  const orders = ordersResponse?.data?.orders ?? [];

  const totalGear = equipment.length;

  const activeGear = equipment.filter((gear) => gear.isAvailable).length;

  const totalRequests = orders.length;

  const revenue = orders
    .filter((order) => order.status === "RETURNED")
    .reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="space-y-8 p-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Provider Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Manage your equipment, rental requests, and business performance.
        </p>
      </div>

      {/* Statistics */}
      <ProviderStatsCards
        totalGear={totalGear}
        activeGear={activeGear}
        totalRequests={totalRequests}
        revenue={revenue}
      />

      {/* Revenue + Popular Equipment */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueCard orders={orders} />

        <PopularEquipment orders={orders} />
      </div>
      <RentalStatusOverview orders={orders} />

      {/* Recent Requests */}
      <RecentRentalRequests orders={orders} />
    </div>
  );
}
