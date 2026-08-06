import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="space-y-4 p-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-md" />

            <Skeleton className="h-4 w-45" />

            <Skeleton className="h-4 w-25" />

            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
