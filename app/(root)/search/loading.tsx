import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-2 flex-col items-center">
                <Skeleton className="my-2 h-10 w-1/5" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 50 }).map((_, i) => (
                    <Skeleton key={`skeleton-user-card-${i}`} className="h-16 w-full" />
                ))}
            </div>
        </div>
    )
}