import { PostCard } from "@/components/post/card";
import ProfileHeader from "@/components/shared/ProfileHeader";
import EmptyStateCard from "@/components/shared/empty-state-card";
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

  const thisUserRepo = new UserRepository({ clerkId: clerk.id });
  const thisUser = await thisUserRepo.getUser();
  if (!thisUser) notFound();

  let hasIssue = false;
  const profileRepo = new UserRepository({ username });
  const [thisProfile, thisProfilePosts, thisProfileIsFollowing, thisProfileIsFollowedBy] = await Promise.all([
    profileRepo.getUser(), 
    profileRepo.getUserPosts(), 
    profileRepo.getFollowing(), 
    profileRepo.getFollowedBy()
  ]).catch(() => {
    hasIssue = true
    return []
  });

  if (hasIssue || !thisProfile) {
    return <NotFound />
  }

  const hasPosts = thisProfilePosts.length > 0;
  return (
    <section className="flex flex-col gap-10">
      <ProfileHeader
        thisUser={{
          clerkId: thisUser.clerkId,
          userId: thisUser.id,
          username: thisUser.username
        }}
        visitedProfile={thisProfile}
        followedBy={thisProfileIsFollowedBy}
        following={thisProfileIsFollowing}
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
          ? thisProfilePosts.map((p, idx) => {
            return <PostCard 
              key={p.id} 
              {...p} 
              user={thisProfile} 
              thisUser={{
                id: thisUser.id
              }}
              data-last={idx === thisProfilePosts.length - 1} 
              className="data-[last=true]:rounded-b-xl rounded-none border-t-0" 
            />
          })
          : <EmptyStateCard message="Este usuário ainda não fez nenhuma postagem." />
        }
      </div>
    </section>
  )
}
