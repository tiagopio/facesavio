import { UserCard } from "@/components/user/card";
import { getUsers } from "@/lib/db";
import { UserRepository } from "@/repository/user";
import { currentUser } from "@clerk/nextjs/server";

export async function Users() {
    const clerk = await currentUser();
    if (!clerk) return null;

    const userRepo = new UserRepository({ clerkId: clerk.id });
    const users = await getUsers({ max: 10 });
    const followers = await userRepo.getFollowers();

    return (
        <>
            {users.map((user) => (
                <UserCard key={user.id} {...user} isFollowing={followers.has(user.id)} />
            ))}
        </>
    )
}