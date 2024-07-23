"server-only"

import { currentUser } from "@clerk/nextjs/server"
import { User } from "@prisma/client"
import { db } from "."

/**
 * Admin function: Get any user on database
 */
async function getUser({
    clerkId,
    username
}: Partial<{ 
    clerkId: string,
    username: string,
}>): Promise<User | null> {
    const user = await currentUser()
    if (!user) {
        return null
    }
    
    if (clerkId) {
        return db.user.findUnique({
            where: {
                clerkId: user.id
            }
        })
    }

    if (username) {
        return db.user.findUnique({
            where: { username }
        })
    }

    return null
}

export async function getUserByClerkId({ clerkId }: { clerkId: string }) {
    return getUser({ clerkId })
}

export async function getUserByUsername({ username }: { username: string }) {
    return getUser({ username })
}

export async function getUsers({ max = 20 }: { max?: number }) {
    const user = await currentUser()
    
    return db.user.findMany({ 
        take: max,
        where: {
            NOT: {
                clerkId: user?.id
            }
        }
    })
}

export async function fetchUser(username: string) {
    return db.user.findUnique({
        where: {
            username: username,
        },
    });
}