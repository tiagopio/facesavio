import { PostCard } from "@/components/post/card";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchUser } from "@/lib/db/server";
import { UserRepository } from "@/repository/user";
import { currentUser } from "@clerk/nextjs/server"
import { MessageSquareText } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Page({ params: { username } }: { params: { username: string } }) {

  const clerk = await currentUser();
  if (!clerk) notFound();

  const userRepo = new UserRepository({ username });
  const user = await userRepo.getUser();

  if (!user) {
    return (
      <section className="text-main-text">
        User not found.
      </section>
    );
  }

  const userPosts = await userRepo.getUserPosts();
  const hasPosts = userPosts.length > 0;

  return (
    <section className="flex flex-col gap-10">
      <ProfileHeader
        clerkId={clerk.id}
        visitedProfile={user}
        posts={userPosts}
      />
      <div className="flex flex-col">
        <Card className="b rounded-b-none">
          <CardHeader>
            <CardTitle>
              <MessageSquareText />
              Postagens do usuário
            </CardTitle>
          </CardHeader>
        </Card>
        {hasPosts
          ? userPosts.map((p, idx) => {
            return <PostCard key={p.id} {...p} user={user} data-last={idx === userPosts.length - 1} className="data-[last=true]:rounded-b-xl rounded-none border-t-0" />
          })
          : <div className="w-full rounded-b-xl p-10 flex items-center justify-center bg-white border border-t-0">
            <p className="text-neutral-500 text-sm">Este usuário ainda não fez nenhuma postagem.</p>
          </div>
        }
      </div>
    </section>
  )
}
