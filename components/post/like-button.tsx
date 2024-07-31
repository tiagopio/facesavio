"use client"

import { follow, unfollow } from "@/lib/db";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, ButtonProps } from "../ui/button";
import { MouseEvent } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { Ban, Check, ThumbsUp, UserRoundPlus } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { like, unlike } from "./action";

type Props = {
    likeCount: number;
    postId: string;
    isLiked: boolean;
} & ButtonProps;
export function LikeButton({
    likeCount,
    isLiked,
    postId,
    size = "sm",
    variant = "ghost",
    className,
    ...props
}: Props) {
    const [liked, setLiked] = useState(isLiked);
    const [likes, setLikes] = useState(likeCount);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLiked(isLiked);
        setLikes(likeCount);
    }, [isLiked, likeCount]);

    const handleLike = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (loading) {
            toast.info("Aguarde um momento...");
            return
        };

        setLoading(true);
        if (liked) {
            setLiked(false);
            setLikes(l => l - 1);
            const { error, message } = await unlike({ postId });

            if (error) {
                setLiked(true);
                setLikes(l => l + 1);
                toast.error(message);
            }
        }
        else {
            setLiked(true);
            setLikes(l => l + 1);
            const { error, message } = await like({ postId });

            if (error) {
                setLiked(false);
                setLikes(l => l - 1);
                toast.error(message);
            }
        }

        setLoading(false);
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    size={size}
                    onClick={handleLike}
                    variant={variant}
                    className={cn("transition-colors data-[liked=true]:text-main-primary data-[liked=true]:font-bold", className)}
                    data-liked={liked}
                    {...props}
                >
                    <ThumbsUp />
                    {likes}
                </Button>
            </TooltipTrigger>
            <TooltipContent hideWhenDetached={true}>Gostei</TooltipContent>
        </Tooltip>
    )
}