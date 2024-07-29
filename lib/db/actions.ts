"use server"

import { currentUser } from "@clerk/nextjs/server"
import { db } from "."
import { ActionResponse } from "@/types"
import { UserRepository } from "@/repository/user"

async function followCheck({ username }: { username: string }) {
    const clerk = await currentUser()
    if (!clerk) {
        throw new Error("Usuário não encontrado")
    }
    
    const followerRepo = new UserRepository({ username })
    const follower = await followerRepo.getUser()

    const userRepo = new UserRepository({ clerkId: clerk.id })
    const user = await userRepo.getUser()
    
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