import { Input } from "@/components/ui/input";
import { UserCard } from "@/components/user/card";
import { getUsers, getFollowers } from "@/lib/db";

export default async function Page() {
    const users = await getUsers({ max: 10 });
    const followers = await getFollowers();

    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-2 flex-col items-center text-light-1">
                <h1 className="text-heading1-bold">Buscar</h1>
                <Input placeholder="Buscar" />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <UserCard key={user.id} {...user} isFollowing={followers?.get(user.username)} />
                ))}
            </div>
        </div>
    )
}