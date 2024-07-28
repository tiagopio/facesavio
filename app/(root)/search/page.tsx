import { Input } from "@/components/ui/input";
import { UserCard } from "@/components/user/card";
import { getUsers, getFollowers } from "@/lib/db";
import { Search } from "lucide-react";

export default async function Page() {
    const users = await getUsers({ max: 10 });
    const followers = await getFollowers();

    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-2 flex-col items-start text-main-text">
                <div className="flex gap-2 items-center">
                    <Search />
                    <h1 className="text-2xl font-bold tracking-tight">Buscar</h1>
                </div>
                <Input placeholder="Buscar..." className="bg-white" />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <UserCard key={user.id} {...user} isFollowing={followers?.get(user.id)} />
                ))}
            </div>
        </div>
    )
}