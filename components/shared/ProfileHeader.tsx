import Link from "next/link";
import Image from "next/image";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { MessageSquareText, SquareUserRound, UserRound } from "lucide-react";
import { Post, User } from "@prisma/client";
import { Separator } from "../ui/separator";
import { PostCard } from "../post/card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { initials } from "@/lib/utils";

type Props = {
  clerkId: string;
  type?: string;
  visitedProfile: User;
  posts: Array<Post>;
};

function ProfileHeader({
  clerkId,
  visitedProfile,
  type,
  posts
}: Props) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <UserRound />
          Dados do usuário
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <div className='flex items-center gap-3'>
            <Avatar className="w-20 h-20">
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
          {clerkId === visitedProfile.clerkId && type !== "Community" && (
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
          )}
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