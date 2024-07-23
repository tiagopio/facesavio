import { Input } from "@/components/ui/input";
import { UserCard } from "@/components/user/card";
import { getUsers } from "@/lib/db";

export default async function Page() {
    const users = await getUsers({ max: 10 });

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-2 flex-col items-center text-light-1">
                <h1 className="text-heading1-bold">Buscar</h1>
                <Input placeholder="Buscar" />
            </div>
            <div className="flex justify-evenly gap-3">
                {users.map((user) => (
                    <UserCard key={user.id} {...user} />
                ))}
            </div>
        </div>
    )
}