import { AtSign, HomeIcon, MessageSquareText } from "lucide-react"
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import { PostCreate } from "@/components/post/create";
import { PostCard } from "@/components/post/card";

export default async function Home() {
  const posts = await db.post.findMany({
    include: {
      user: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="text-main-text flex flex-col gap-5">
        <PostCreate className="rounded-xl" />
        <div className="flex gap-2 text-neutral-800 items-center">
          <MessageSquareText />
          <h2 className="text-heading3-bold tracking-tight">Postagens recentes</h2>
        </div>
        <div className="flex flex-col gap-3">
          {posts.map(p => (
            <PostCard key={p.id} {...p} />
          ))}
        </div>
    </div>
  );
}
