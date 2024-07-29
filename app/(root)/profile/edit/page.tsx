import { currentUser } from "@clerk/nextjs/server";

import AccountProfile from "@/components/forms/AccountProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Info, UserRoundPen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserRepository } from "@/repository/user";

export default async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userRepo = new UserRepository({ clerkId: user.id });
  const userInfo = await userRepo.getUser();

  const userData = {
    id: user.id,
    objectId: userInfo?.id ?? "",
    username: user.username ?? userInfo?.username ?? "",
    name: userInfo?.name ?? user.firstName ?? "",
    bio: userInfo?.bio ?? "",
    image: userInfo?.imageUrl ?? user.imageUrl ?? "",
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div className="flex items-center gap-2">
              <UserRoundPen />
              Editar perfil
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon-sm" variant="outline" asChild>
                  <Link href='/profile'>
                    <ArrowLeft />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Voltar</TooltipContent>
            </Tooltip>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AccountProfile user={userData} btnTitle='Continue' />
        </CardContent>
      </Card>
    </>
  );
}