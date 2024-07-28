import { PostCard } from "@/components/post/card";
import { db } from "@/lib/db";

export async function Posts() {
    const posts = await db.post.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return (
        <>
            {posts.map((p, idx) => {
                return <PostCard key={p.id} {...p} data-last={idx === posts.length - 1} className="data-[last=true]:rounded-b-xl rounded-none border-t-0" />
            })}
        </>
    )
}