"use client"

import { useDebounce } from "use-debounce"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"

export default function SearchPeople() {
    const [query, setQuery] = useState("")
    const [queryDebounced] = useDebounce(query, 500)
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const search = new URLSearchParams(searchParams);
        if (queryDebounced)
            search.set("query", queryDebounced.trim());
        else
            search.delete("query");

        const url = `${pathname}?${search.toString()}`

        router.replace(url)
    }, [queryDebounced, router, searchParams, pathname])
    
    return (
        <Input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar..."
        />
    )
}