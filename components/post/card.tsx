import { Post } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ThumbsUp } from "lucide-react";

export function PostCard({
    title,
    body,
    likes
}: Post) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{body}</CardContent>
            <CardFooter className="flex gap-2">
                <div className="flex gap-2 rounded">
                    <ThumbsUp />
                    {likes} Likes
                </div>
            </CardFooter>
        </Card>
    )
}