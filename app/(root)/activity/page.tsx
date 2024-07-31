import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRepository } from "@/repository/user";
import { currentUser } from "@clerk/nextjs/server";
import { Heart } from "lucide-react";
import { notFound } from "next/navigation";
import EmptyStateCard from "@/components/shared/empty-state-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initials } from "@/lib/utils";
import Link from "next/link";

export default async function Page() {
    const clerk = await currentUser()
    if (!clerk) return notFound();

    const userRepo = new UserRepository({ clerkId: clerk.id });
    const likes = await userRepo.getLikes({ max: 10 });
    const hasLikes = likes.length > 0;
    return (
        <section className="flex flex-col">
            <Card className="rounded-b-none">
                <CardHeader>
                    <CardTitle>
                        <Heart />
                        Atividades
                    </CardTitle>
                    <CardDescription>
                        Veja as atualizações recentes do seu perfil
                    </CardDescription>
                </CardHeader>
            </Card>
            {hasLikes 
            ? (
                likes.map((like) => (
                    <Card key={`like-${like.postId}-${like.userId}`}>
                        <CardHeader>
                            <CardTitle>
                                <Link href={`/profile/${like.user.username}`}>
                                    <Avatar>
                                        <AvatarImage src={like.user.imageUrl ?? ""} alt={like.user.username} />
                                        <AvatarFallback>{initials(like.user.name || like.user.username)}</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <span>
                                    {like.user.username} curtiu sua publicação
                                </span>
                                <Heart className="w-3 h-3 text-red-500" />
                            </CardTitle>
                            <CardDescription>
                                {like.post.title}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))
            )
            : <EmptyStateCard message="Não há atividades no momento" />
            }
        </section>
    )
}