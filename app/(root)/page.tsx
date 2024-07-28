import { AtSign, HomeIcon, MessageSquareText } from "lucide-react"
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import { PostCreate } from "@/components/post/create";
import { PostCard } from "@/components/post/card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { Posts } from "./posts";
import Loading from "./posts-loading";

export default function Home() {
  return (
    <div className="text-main-text flex flex-col gap-7">
      <PostCreate className="rounded-xl" />
      <div className="flex flex-col">
        <Card className="b rounded-b-none">
          <CardHeader>
            <CardTitle>
              <MessageSquareText />
              Postagens recentes
            </CardTitle>
          </CardHeader>
        </Card>
        <Suspense fallback={<Loading />}>
          <Posts />
        </Suspense>
      </div>
    </div>
  );
}
