import { PostCard } from "@/components/post/card";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserRepository } from "@/repository/user";
import { currentUser } from "@clerk/nextjs/server"
import { ArrowLeft, Home, MessageSquare, MessageSquareText, Search, SearchX } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

function NotFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <SearchX />
          Usuário não encontrado
        </CardTitle>
        <CardDescription>
          O usuário que você está tentando acessar não existe.
        </CardDescription>
      </CardHeader>
        <CardContent className="flex gap-2">
          <Button asChild>
            <Link href="/">
              <MessageSquare />
              Início
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/search">
              <ArrowLeft />
              Buscar usuários
            </Link>
          </Button>
        </CardContent>
    </Card>
  );
}

export default async function Page({ params: { username } }: { params: { username: string } }) {

  const clerk = await currentUser();
  if (!clerk) notFound();

  let hasIssue = false;
  const userRepo = new UserRepository({ username });
  const [user, userPosts, followers, following] = await Promise.all([
    userRepo.getUser(), 
    userRepo.getUserPosts(), 
    userRepo.getFollowers(), 
    userRepo.getFollowing()
  ]).catch(() => {
    hasIssue = true
    return []
  });

  if (hasIssue || !user) {
    return <NotFound />
  }

  const hasPosts = userPosts.length > 0;
  return (
    <section className="flex flex-col gap-10">
      <ProfileHeader
        clerkId={clerk.id}
        visitedProfile={user}
        followers={followers}
        following={following}
      />
      <div className="flex flex-col">
        <Card className="rounded-b-none">
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
