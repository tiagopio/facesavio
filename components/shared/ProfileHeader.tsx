import Link from "next/link";
import Image from "next/image";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Bolt, MessageSquareText, SquareUserRound, UserRound } from "lucide-react";
import { Post, User } from "@prisma/client";
import { Separator } from "../ui/separator";
import { PostCard } from "../post/card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { initials } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { FollowInformation } from "./follow-information";
import { FollowButton } from "../user/follow-button";

type Props = {
  thisUser: {
    clerkId: string;
    userId: string;
    username: string;
  };
  type?: string;
  visitedProfile: User;
  following: Set<string>;
  followedBy: Set<string>;
};

function ProfileHeader({
  thisUser,
  visitedProfile,
  type,
  following,
  followedBy
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="flex items-center gap-2">
            <UserRound />
            Dados do usuário
          </div>
          {thisUser.clerkId === visitedProfile.clerkId && type !== "Community"
          ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size={"icon-sm"} asChild>
                <Link href='/profile/edit'>
                  <Bolt />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Configurações</TooltipContent>
          </Tooltip>
          )
          : <FollowButton username={{
            thisUser: thisUser.username,
            toFollow: visitedProfile.username
          }} isFollowing={followedBy.has(thisUser.userId)} size={"icon-sm"} />
          }
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-7">
        <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
          <div className='flex items-center gap-3'>
            <Avatar className="w-14 h-14 md:w-20 md:h-20">
              <AvatarImage src={visitedProfile.imageUrl ?? ""} alt={visitedProfile.name} />
              <AvatarFallback>{initials(visitedProfile.name || visitedProfile.username)}</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <h2 className='text-left font-bold text-xl text-main-text'>
                {visitedProfile.name}
              </h2>
              <p className='text-sm text-neutral-400'>@{visitedProfile.username}</p>
            </div>
          </div>
          {/* {clerkId === visitedProfile.clerkId && type !== "Community" && (
            <Button asChild>
              <Link href='/profile/edit'>
                <Image
                  src='/assets/edit.svg'
                  alt='logout'
                  width={16}
                  height={16}
                />
                <p className='max-sm:hidden'>Editar</p>
              </Link>
            </Button>
          )} */}
          <FollowInformation 
            followedBy={followedBy}
            following={following}
            className="flex flex-row md:flex-col gap-5 md:gap-1 justify-end text-sm text-neutral-700 text-end"
          />
        </div>
        <Separator />
        <div className="w-full flex flex-col justify-start rounded-lg p-3 gap-2">
          <Label>Bio</Label>
          <div className="py-3 px-5 rounded-lg bg-slate-50">
            <p className="text-neutral-700 text-sm">{visitedProfile.bio}</p>
          </div>
        </div>

      </CardContent>
    </Card >
  );
}

export default ProfileHeader;