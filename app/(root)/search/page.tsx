import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserCard } from "@/components/user/card";
import { getUsers, getFollowers } from "@/lib/db";
import { Search } from "lucide-react";
import { Suspense } from "react";
import { Users } from "./people";
import Loading from "./loading";

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Search />
                        Buscar
                    </CardTitle>
                    <CardDescription>Encontre pessoas na plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input placeholder="Buscar..." className="bg-white" />
                </CardContent>
            </Card>
            <Suspense fallback={<Loading />}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <Users />
                </div>
            </Suspense>
        </div>
    )
}