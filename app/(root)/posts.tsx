import { PostCard } from "@/components/post/card";
import { db } from "@/lib/db";
import { UserRepository } from "@/repository/user";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export async function Posts() {
    const clerk = await currentUser();
    const thisUserId = clerk?.publicMetadata.id;
    if (!clerk || !thisUserId) return notFound();

    const userRepo = new UserRepository({ clerkId: clerk.id });
    const posts = await userRepo.getSuggestedPosts();

    return (
        <>
            {posts.map((p, idx) => {
                return <PostCard 
                    key={p.id} 
                    {...p}
                    thisUser={{
                        id: thisUserId
                    }}
                    data-last={idx === posts.length - 1} 
                    className="data-[last=true]:rounded-b-xl rounded-none border-t-0"
                />
            })}
        </>
    )
}