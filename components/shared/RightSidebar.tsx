import { CalendarBox } from "@/components/custom/calendar"
import { Card, CardHeader, CardTitle } from "../ui/card";
import { BadgePlus } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { UserRepository } from "@/repository/user";
import { UserCard } from "../user/card";

async function RightSidebar() {
  const clerk = await currentUser();
  if (!clerk) return notFound();

  const userRepo = new UserRepository({ clerkId: clerk.id });
  const [thisUser, suggested, following] = await Promise.all([
    userRepo.getUserOrThrow(),
    userRepo.getSuggestedUsers({ max: 3 }),
    userRepo.getFollowing()
  ]).catch(() => notFound());

  return (
    <section className="rightsidebar">
      <div className="flex flex-col gap-1">
        <Card className="min-w-[250px]">
          <CardHeader>
            <CardTitle className="text-sm">
              <BadgePlus />
              Sugestões
            </CardTitle>
          </CardHeader>
        </Card>
        {suggested.map((user) => (
          <UserCard
            key={`suggested-${user.id}`}
            bio={user.bio}
            name={user.name}
            imageUrl={user.imageUrl}
            username={{
              thisUser: thisUser.username,
              toFollow: user.username
            }}
            isFollowing={following.has(user.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default RightSidebar;