import { Post, User } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export function PostCard({
    title,
    body,
    likes,
    user: {
        username,
        name,
        imageUrl
    }
}: Post & { user: User }) {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{body}</CardContent>
            <CardFooter className="flex gap-2 py-3 border-t justify-between text-sm">
                <div className="flex gap-2 rounded items-center text-neutral-600">
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                        <ThumbsUp />
                    </Button>
                    {likes} Likes
                </div>
                <div className="flex gap-3 items-center">
                    <span className="text-neutral-600">@{username}</span>
                    <Link href={`/profile/${username}`}>
                        <Image src={imageUrl ?? ""} className="rounded-full" alt={username} width={25} height={25} />
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}