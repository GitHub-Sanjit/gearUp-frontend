export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />

        <div className="h-4 w-96 animate-pulse rounded-md bg-muted" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex justify-between">
              <div className="space-y-3">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />

                <div className="h-8 w-16 animate-pulse rounded bg-muted" />

                <div className="h-3 w-32 animate-pulse rounded bg-muted" />
              </div>

              <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div className="h-5 w-40 animate-pulse rounded bg-muted" />

            <div className="h-10 w-48 animate-pulse rounded bg-muted" />

            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 animate-pulse rounded-lg bg-muted" />

              <div className="h-24 animate-pulse rounded-lg bg-muted" />
            </div>
          </div>
        </div>

        {/* Popular Equipment */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div className="h-5 w-44 animate-pulse rounded bg-muted" />

            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />

                  <div className="space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-muted" />

                    <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                  </div>
                </div>

                <div className="h-12 w-12 animate-pulse rounded-lg bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Requests Skeleton */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="space-y-5">
          <div className="h-5 w-52 animate-pulse rounded bg-muted" />

          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-3">
                <div className="h-4 w-36 animate-pulse rounded bg-muted" />

                <div className="h-3 w-24 animate-pulse rounded bg-muted" />
              </div>

              <div className="space-y-3">
                <div className="h-4 w-20 animate-pulse rounded bg-muted" />

                <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
