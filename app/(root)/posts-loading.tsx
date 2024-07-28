import { Skeleton } from "@/components/ui/skeleton";

const N = 3
export default function Loading() {
    return (
        <>
            {Array.from({ length: N }).map((_, i) => (
                <Skeleton key={i} data-last={i === N - 1} className="w-full h-[100px] data-[last=true]:rounded-b-xl rounded-none border-t-0" />
            ))}
        </>
    )
}