"use server"

import { ActionResponse } from "@/types";
import { PostCreateSchema, postCreateSchema } from "./schema";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { UserRepository } from "@/repository/user";

export async function post(values: PostCreateSchema): Promise<ActionResponse> {
    const clerk = await currentUser();
    const { success, data } = postCreateSchema.safeParse(values)
    
    const badRequest = {
        error: true,
        message: "Bad request"
    }

    if (!success || !clerk)
        return badRequest

    const userRepo = new UserRepository({ clerkId: clerk.id });
    const user = await userRepo.getUser();
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