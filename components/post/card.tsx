import { Like, Post, User } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { initials } from "@/lib/utils";
import { LikeButton } from "./like-button";

export function PostCard({
    id,
    title,
    thisUser,
    body,
    likes,
    createdAt,
    userId,
    user: {
        name,
        username,
        imageUrl
    },
    ...props
}: Post & { user: User, likes: Array<Like> } & ComponentProps<"div"> & {
    thisUser: {
        id: string
    }
}) {
    return (
        <Card {...props}>
            <CardHeader className="flex-row justify-between items-center">
                <CardTitle>{title}</CardTitle>
                <div className="text-xs text-neutral-400">
                    <span>{formatDistance(new Date(createdAt), new Date(), { addSuffix: true, locale: ptBR })}</span>
                </div>
            </CardHeader>
            <CardContent>
                {body}
            </CardContent>
            <CardFooter className="flex gap-2 py-3 border-t justify-between text-sm">
                <LikeButton 
                    postId={id} 
                    likeCount={likes.length} 
                    isLiked={likes.some(like => like.userId === thisUser.id)}
                />
                <div className="flex gap-2 rounded items-center text-neutral-600">
                    <Button variant="ghost" size="icon-sm">
                        <ThumbsUp />
                    </Button>
                    {likes.length} Likes
                </div>
                <div className="flex gap-3 items-center">
                    <span className="text-neutral-600">@{username}</span>
                    <Link href={`/profile/${username}`}>
                        <Avatar className="w-6 h-6 text-xs">
                            <AvatarImage src={imageUrl ?? ""} alt={username} />
                            <AvatarFallback>{initials(name || username)}</AvatarFallback>
                        </Avatar>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}