import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Profile Header Skeleton */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <Skeleton className="h-24 w-24 rounded-full" />

          <div className="w-full space-y-3 sm:w-auto">
            <Skeleton className="h-7 w-48" />

            <Skeleton className="h-4 w-64" />

            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>
      </div>

      {/* Profile Information Skeleton */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-6">
          <Skeleton className="h-6 w-56" />

          <Skeleton className="mt-2 h-4 w-72" />
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-24" />

              <Skeleton className="h-5 w-48" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
