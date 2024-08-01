import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { FollowButton } from "./follow-button";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function UserCard({
    username,
    imageUrl,
    className,
    name,
    isFollowing,
    ...props
}: {
    isFollowing: boolean;
    username: {
        thisUser: string;
        toFollow: string;
    }
} & Pick<User, "imageUrl" | "bio" | "name"> & ComponentProps<"div">) {

    return (
        <Link href={`/profile/${username.toFollow}`}>
            <div className={cn("rounded-lg flex flex-row h-[80px] bg-white justify-between border hover:border-neutral-300 transition-colors", className)} {...props}>
                <div className="w-auto h-full aspect-square p-3">
                    {imageUrl && <Image src={imageUrl} alt={username.toFollow} width={100} height={100} className="rounded-lg object-cover aspect-square" />}
                </div>
                <div className="w-full flex p-3 flex-col gap-0 items-start justify-center">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <p className="font-bold tracking-tighter">{name.split(" ")[0]}</p>
                        </TooltipTrigger>
                        <TooltipContent>
                            {name}
                        </TooltipContent>
                    </Tooltip>
                    <p className="text-sm text-neutral-400 tracking-tighter">@{username.toFollow}</p>
                </div>
                <div className="flex flex-col items-center justify-center px-3">
                    <FollowButton
                        username={username}
                        isFollowing={isFollowing}
                        size={"icon"}
                    />
                </div>
            </div>
        </Link>
    )
}