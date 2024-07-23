import { getUserByClerkId } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
    const clerk = await currentUser();
    if (!clerk) return null;

    const user = await getUserByClerkId({ clerkId: clerk.id });
    if (!user) return null;

    redirect(`/profile/${user.username}`);
}