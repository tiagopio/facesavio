import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col gap-7">
            <Skeleton className="w-full h-[500px] rounded-xl" />
            <Skeleton className="w-full h-[100px] rounded-xl" />
            <Skeleton className="w-full h-[300px] rounded-xl" />
        </div>
    )
}