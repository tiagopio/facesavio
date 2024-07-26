"use server"

import { ActionResponse } from "@/types";
import { PostCreateSchema, postCreateSchema } from "./schema";
import { currentUser } from "@clerk/nextjs/server";
import { db, getUserByClerkId } from "@/lib/db";

export async function post(values: PostCreateSchema): Promise<ActionResponse> {
    const clerk = await currentUser();
    const { success, data } = postCreateSchema.safeParse(values)
    
    const badRequest = {
        error: true,
        message: "Bad request"
    }

    if (!success || !clerk)
        return badRequest

    const user = await getUserByClerkId({ clerkId: clerk.id })
    if (!user) return badRequest

    const { message, title } = data;
    try {
        await db.post.create({
            data: {
                userId: user.id,
                title,
                body: message,
            }
        })
        
        return {
            error: false,
            message: "Success"
        }
    }
    catch (err) {
        console.error(err)
        return {
            error: true,
            message: "Erro interno"
        }
    }
}