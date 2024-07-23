"server-only"

import { db } from "."

export async function getUsers({ max = 20 }: { max?: number }) {
    return db.user.findMany({ take: max })
}