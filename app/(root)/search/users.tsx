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
    const [thisUser, interestingUsers, thisUserIsFollowing] = await Promise.all([
        userRepo.getUser(),
        query ? UserRepository.getUsers({ max: MAX, query }) : userRepo.getSuggestedUsers({ max: MAX }),
        userRepo.getFollowing()
    ]);

    return (
        <>
            {interestingUsers.map((user) => (
                <UserCard
                    username={{
                        thisUser: thisUser!.username,
                        toFollow: user.username
                    }}
                    key={`user-card-${user.id}`}
                    imageUrl={user.imageUrl}
                    name={user.name}
                    bio={user.bio}
                    isFollowing={thisUserIsFollowing.has(user.id)} 
                />
            ))}
        </>
    )
}