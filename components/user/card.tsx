import { User } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { UserRound, UserRoundPlus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function UserCard({ 
    username,
    imageUrl,
    bio,
    name
}: Pick<User, "username" | "imageUrl" | "bio" | "name">) {
    return (
        <div className="rounded flex flex-row bg-neutral-100">
            <div className="w-[100px] h-[100px]">
                {imageUrl && <Image src={imageUrl} alt={username} width={100} height={100} className="rounded-l" />}
            </div>
            <CardHeader className="w-[200px] py-3 flex flex-col items-start justify-center">
                <CardTitle>{name}</CardTitle>
                <CardDescription>{bio}</CardDescription>
            </CardHeader>
            <div className="flex flex-col gap-2 items-center justify-center px-3">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="default" size="icon">
                            <UserRoundPlus />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Seguir</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="secondary" size="icon">
                            <UserRound />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Ver perfil</TooltipContent>
                </Tooltip>
            </div>
        </div>
    )
}