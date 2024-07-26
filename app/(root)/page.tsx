import { HomeIcon } from "lucide-react"
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import { PostCreate } from "@/components/post/create";
import { PostCard } from "@/components/post/card";

export default async function Home() {
  const posts = await db.post.findMany();
  return (
    <div className="text-main-text flex flex-col gap-5">
        <PostCreate className="rounded-xl" />
        <div className="flex flex-col gap-3">
          {posts.map(p => (
            <PostCard key={p.id} {...p} />
          ))}
        </div>
    </div>
  );
}
