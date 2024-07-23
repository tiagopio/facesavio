"use server"

import { currentUser } from "@clerk/nextjs/server"
import { db, getUserByClerkId, getUserByUsername } from "."
import { ActionResponse } from "@/types"

async function followCheck({ username }: { username: string }) {
    const clerk = await currentUser()
    if (!clerk) {
        throw new Error("Usuário não encontrado")
    }
    
    const follower = await getUserByUsername({ username })
    const user = await getUserByClerkId({ clerkId: clerk.id })
    
    if (typeof username !== "string" || !follower || !user || user.id === follower.id) {
        throw new Error("Bad request")
    }

    return { user, follower }
}


export async function follow({ username }: { username: string }): Promise<ActionResponse> {
    try {
        const { user, follower } = await followCheck({ username })
        await db.follow.create({
            data: {
                userId: user.id,
                followingId: follower.id
            },
        })
    } catch (e) {
        console.error(e)
        return {
            error: true,
            message: "Erro ao seguir usuário"
        }
    }

    return {
        error: false,
        message: "Usuário seguido com sucesso"
    }
}

export async function unfollow({ username }: { username: string }): Promise<ActionResponse> {
    try {
        const { user, follower } = await followCheck({ username })
        await db.follow.deleteMany({
            where: {
                userId: user.id,
                followingId: follower.id
            }
        })
    } catch (e) {
        console.error(e)
        return {
            error: true,
            message: "Erro ao deixar de seguir usuário"
        }
    }

    return {
        error: false,
        message: "Usuário deixado de seguir com sucesso"
    }
}


/**
 * Returns a map for username, to a boolean
 */
export async function getFollowers(): Promise<Map<string, boolean> | null> {
    const clerk = await currentUser()
    if (!clerk) {
        return null
    }

    const user = await getUserByClerkId({ clerkId: clerk.id })
    if (!user) {
        return null
    }

    try {
        const followers = await db.follow.findMany({
            where: {
                userId: user.id
            }
        })
    
        const followerMap = new Map<string, boolean>()
        followers.forEach(f => {
            followerMap.set(f.followingId, true)
        })
    
        return followerMap
    }
    catch (e) {
        console.error(e)
        return null
    }
}