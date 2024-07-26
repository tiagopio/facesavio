import { z } from "zod"

export type PostCreateSchema = z.infer<typeof postCreateSchema>
export const postCreateSchema = z.object({
    title: z.string()
        .min(3, { message: "O título deve ter no mínimo 3 caracteres" })
        .max(100, { message: "O título deve ter no máximo 100 caracteres" }),
    message: z.string()
        .min(10, { message: "O post deve ter no mínimo 10 caracteres" })
        .max(500, { message: "O post deve ter no máximo 500 caracteres" })
})
