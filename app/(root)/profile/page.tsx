import { Skeleton } from "@/components/ui/skeleton";
import { UserRepository } from "@/repository/user";
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
    const clerk = await currentUser();
    if (!clerk) return notFound();

    const userRepo = new UserRepository({ clerkId: clerk.id });
    const user = await userRepo.getUser();
    if (!user) return notFound();

    redirect(`/profile/${user.username}`);

    return <Skeleton className="h-[300px] w-full" />;
}