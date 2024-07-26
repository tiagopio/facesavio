"use client"

import { User } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Ban, Check, StopCircle, UserRound, UserRoundPlus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useState } from "react";
import { follow, unfollow } from "@/lib/db/actions";
import { toast } from "sonner";

export function UserCard({ 
    username,
    imageUrl,
    bio,
    name,
    isFollowing
}: {
    isFollowing?: boolean;
} & Pick<User, "username" | "imageUrl" | "bio" | "name">) {
    const [following, setFollowing] = useState(!!isFollowing);
    const [unfollowConfirmation, setUnfollowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFollow = async () => {
        if (loading) return;

        setLoading(true);
        if (following && unfollowConfirmation) {
            setFollowing(false);
            setUnfollowConfirmation(false);
            const { error, message } = await unfollow({ username });
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
            const { error, message } =  await follow({ username });
            if (error) {
                setFollowing(false);
                toast.error(message);
            }
        }

        setLoading(false);
    }

    return (
        <div className="rounded-lg flex flex-row bg-white justify-between">
                <div className="w-auto h-full aspect-square">
                <Link href={`/profile/${username}`}>
                    {imageUrl && <Image src={imageUrl} alt={username} width={100} height={100} className="rounded-l-lg" />}
               </Link>
                </div>
                <div className="w-full flex p-3 flex-col items-start justify-center">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <p className="tracking-tighter text-body-bold">{name.split(" ")[0]}</p>
                        </TooltipTrigger>
                        <TooltipContent>
                            {name}
                        </TooltipContent>
                    </Tooltip>
                    <p className="text-small-regular text-neutral-400 tracking-tighter">@{username}</p>
                </div>
                <div className="flex flex-col items-center justify-center px-3">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="default" data-unfollow-confirmation={unfollowConfirmation} size="icon" onClick={handleFollow} className="transition-colors data-[unfollow-confirmation='true']:bg-red-500 hover:bg-danger-500 hover:text-light-1">
                                {unfollowConfirmation ? <Ban /> : following ? <Check /> : <UserRoundPlus />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent hideWhenDetached={true}>
                            {unfollowConfirmation ? "Confirmar" : following ? "Seguindo" : "Seguir"}
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
    )
}