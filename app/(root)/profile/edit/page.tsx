import { currentUser } from "@clerk/nextjs/server";

import { fetchUser, getUserByClerkId } from "@/lib/db/server";
import AccountProfile from "@/components/forms/AccountProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRoundPen } from "lucide-react";

export default async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUserByClerkId({ clerkId: user.id });

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
      {/* <div className="flex flex-col">
        <h1 className='font-bold text-2xl tracking-tight'>Edit Profile</h1>
        <p className="text-neutral-500 text-sm">Make any changes</p>
      </div> */}

      <section>
        <Card>
          <CardHeader>
            <CardTitle>
              <UserRoundPen />
              Editar perfil
            </CardTitle>
            <CardDescription>Realize qualquer mudança no seu perfil</CardDescription>
          </CardHeader>
          <CardContent>
            <AccountProfile user={userData} btnTitle='Continue' />
          </CardContent>
        </Card>
      </section>
    </>
  );
}