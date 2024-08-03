// components/post/card.tsx
import { Post, User, Like } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { initials } from "@/lib/utils";
import { LikeButton } from "./like-button";
import { DeleteButton } from "./delete-button"; // Importar o DeleteButton

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
    thisUser: { id: string }
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
                <div className="flex gap-3 items-center">
                    <span className="text-neutral-600">@{username}</span>
                    <Avatar className="w-6 h-6 text-xs">
                        <AvatarImage src={imageUrl ?? ""} alt={username} />
                        <AvatarFallback>{initials(name || username)}</AvatarFallback>
                    </Avatar>
                    {thisUser.id === userId && (
                        <DeleteButton postId={id} />
                        //Renderiza as postagens do usuário logado
                        
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
