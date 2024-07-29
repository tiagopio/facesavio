import { UserCard } from "@/components/user/card";
import { UserRepository } from "@/repository/user";
import { currentUser } from "@clerk/nextjs/server";

const MAX = 15;
export async function Users({
    query
}: {
    query?: string;
}) {
    const clerk = await currentUser();
    if (!clerk) return null;

    if (query)
        console.log(query)
    const userRepo = new UserRepository({ clerkId: clerk.id });
    const [interestingUsers, followers] = await Promise.all([
        query ? UserRepository.queryUsers({ max: MAX, query }) : userRepo.getSuggestedUsers({ max: MAX }),
        userRepo.getFollowers()
    ]);

    return (
        <>
            {interestingUsers.map((user) => (
                <UserCard key={user.id} {...user} isFollowing={followers.has(user.id)} />
            ))}
        </>
    )
}