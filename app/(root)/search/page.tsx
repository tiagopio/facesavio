import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Suspense } from "react";
import { Users } from "./users";
import Loading from "./loading";
import SearchUsers from "./search-users";

export default function Page({ searchParams: { query } }: { searchParams: { query?: string } }) {
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
                    <SearchUsers />
                </CardContent>
            </Card>
            <Suspense fallback={<Loading />}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <Users query={query} />
                </div>
            </Suspense>
        </div>
    )
}