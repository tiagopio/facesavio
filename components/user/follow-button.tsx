"use client"

import { follow, unfollow } from "@/lib/db";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, ButtonProps } from "../ui/button";
import { MouseEvent } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { Ban, Check, UserRoundPlus } from "lucide-react";
import { useUser } from "@clerk/nextjs";

type Props = {
    isFollowing: boolean;
    username: {
        thisUser: string;
        toFollow: string;
    }
} & ButtonProps;
export function FollowButton({
    isFollowing,
    className,
    size = "icon",
    variant = "outline",
    username: {
        thisUser,
        toFollow
    },
    ...props
}: Props) {
    const [following, setFollowing] = useState(isFollowing);
    const [unfollowConfirmation, setUnfollowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFollowing(isFollowing);
    }, [isFollowing]);

    const handleFollow = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (loading) {
            toast.info("Aguarde um momento...");
            return
        };

        setLoading(true);
        if (following && unfollowConfirmation) {
            setFollowing(false);
            setUnfollowConfirmation(false);
            const { error, message } = await unfollow({ username: toFollow });
            if (error) {
                setFollowing(true);
                setUnfollowConfirmation(false);
                toast.error(message);
            }
        }
        else if (following) {
            setUnfollowConfirmation(true);
            setTimeout(() => {
                setUnfollowConfirmation(false);
            }, 3000);
        }
        else {
            setFollowing(true);
            const { error, message } = await follow({ username: toFollow });
            if (error) {
                setFollowing(false);
                toast.error(message);
            }
        }

        setLoading(false);
    }

    return (
        thisUser === toFollow ? null :
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={unfollowConfirmation ? "destructive" : variant} 
                    size={size}
                    onClick={handleFollow}
                    className={cn("transition-colors", className)} 
                    {...props}
                >
                    {unfollowConfirmation ? <Ban /> : following ? <Check /> : <UserRoundPlus />}
                </Button>
            </TooltipTrigger>
            <TooltipContent hideWhenDetached={true}>
                {unfollowConfirmation ? "Confirmar" : following ? "Seguindo" : "Seguir"}
            </TooltipContent>
        </Tooltip>
    )
}