"use server"

import { UserValidation } from "@/lib/validations/user"
import { z } from "zod"
import { db } from "@/lib/db"
import { clerkClient, currentUser } from "@clerk/nextjs/server"
import { ActionResponse } from "@/types"

type User = z.infer<typeof UserValidation>
export async function onboard(user: User): Promise<ActionResponse> {
    const { success, data } = UserValidation.safeParse(user);
    const u = await currentUser();
    if (!u) {
        return {
            error: true,
            message: "Usuário não encontrado"
        }
    }

    if (!success) {
        return {
            error: true,
            message: "Dados inválidos"
        }
    }

    const { profile_photo, name, username, bio } = data
    try {
        const test = await db.user.findFirst({
            where: { username }
        })

        if (test && test.clerkId !== u.id) {
            return {
                error: true,
                message: "Nome de usuário já em uso"
            }
        }

        const { id } = await db.user.upsert({
            where: { clerkId: u.id },
            create: {
                clerkId: u.id,
                imageUrl: profile_photo,
                name,
                username,
                bio
            },
            update: {
                imageUrl: profile_photo,
                name,
                username,
                bio
            }
        })

        await clerkClient().users.updateUser(u.id, {
            publicMetadata: {
                onboardingComplete: true,
                id
            },
            username,
            firstName: name.split(" ")[0],
            lastName: name.split(" ")[1]
        });
    }
    catch (e) {
        return {
            error: true,
            message: "Erro ao atualizar dados"
        }
    }

    return {
        error: false,
        message: "Dados atualizados com sucesso"
    }

}