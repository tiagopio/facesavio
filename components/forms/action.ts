"use server"

import { UserValidation } from "@/lib/validations/user"
import { z } from "zod"
import { db } from "@/lib/db"
import { clerkClient, currentUser } from "@clerk/nextjs/server"
import { ActionResponse } from "@/types"
import { isBase64Image } from "@/lib/utils"
import { notFound } from "next/navigation"

type User = z.infer<typeof UserValidation>
export async function onboard(user: User): Promise<ActionResponse> {
    const { success, data } = UserValidation.safeParse(user);
    const clerk = await currentUser();
    if (!clerk)
        return notFound();

    if (!success) {
        return {
            error: true,
            message: "Dados inválidos"
        }
    }

    const { profile_photo, name, username, bio } = data
    const usernameLower = username.toLowerCase();
    // const blob = profile_photo;
    // if (blob) {
    //   const hasImageChanged = isBase64Image(blob);
  
    //   if (hasImageChanged) {
    //     const imgRes = await startUpload(files);
  
    //     if (imgRes && imgRes[0].url) {
    //       values.profile_photo = imgRes[0].url;
    //     }
    //   }
    // }

    try {
        const test = await db.user.findFirst({
            where: { username: usernameLower }
        })

        if (test && test.clerkId !== clerk.id) {
            return {
                error: true,
                message: "Nome de usuário já em uso"
            }
        }

        const { id } = await db.user.upsert({
            where: { clerkId: clerk.id },
            create: {
                clerkId: clerk.id,
                imageUrl: profile_photo,
                name,
                username: usernameLower,
                bio
            },
            update: {
                imageUrl: profile_photo,
                name,
                username: usernameLower,
                bio
            }
        })

        await clerkClient().users.updateUser(clerk.id, {
            publicMetadata: {
                onboardingComplete: true,
                id
            },
            username: usernameLower,
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