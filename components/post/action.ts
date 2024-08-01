"use server"

import { ActionResponse } from "@/types";
import { PostCreateSchema, postCreateSchema } from "./schema";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { UserRepository } from "@/repository/user";
import { revalidatePath } from "next/cache";

const badRequest = {
    error: true,
    message: "Bad request"
}

const successRequest = {
    error: false,
    message: "Success"
}

const internalError = {
    error: true,
    message: "Internal error"
}
export async function post(values: PostCreateSchema): Promise<ActionResponse> {
    const clerk = await currentUser();
    const { success, data } = postCreateSchema.safeParse(values)
    
    if (!success || !clerk)
        return badRequest

    const { message, title } = data;
    const userRepo = new UserRepository({ clerkId: clerk.id });
    const user = await userRepo.getUser();
    if (!user) return badRequest

    try {
        await db.post.create({
            data: {
                userId: user.id,
                title,
                body: message,
            }
        })
        
        revalidatePath("/")
        revalidatePath("/profile")
        return successRequest
    }
    catch (err) {
        console.error(err)
        return internalError
    }
}

export async function like({ postId }: { postId: string }): Promise<ActionResponse> {
    const clerk = await currentUser();
    if (!clerk)
        return badRequest

    const userRepo = new UserRepository({ clerkId: clerk.id });
    const user = await userRepo.getUser();
    if (!user)
        return badRequest

    try {
        await db.like.create({
            data: {
                userId: user.id,
                postId
            }
        })

        return successRequest
    }
    catch (err) {
        console.error(err)
        return internalError
    }
}

export async function unlike({ postId }: { postId: string }): Promise<ActionResponse> {
    const clerk = await currentUser();
    if (!clerk)
        return badRequest

    const userRepo = new UserRepository({ clerkId: clerk.id });
    const user = await userRepo.getUser();
    if (!user)
        return badRequest

    try {
        await db.like.deleteMany({
            where: {
                userId: user.id,
                postId
            }
        })

        return successRequest
    }
    catch (err) {
        console.error(err)
        return internalError
    }
}