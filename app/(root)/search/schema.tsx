import { z } from "zod";

export type Query = z.infer<typeof querySchema>;
export const querySchema = z.object({
    query: z.string()
        .max(64, { message: "A consulta deve ter no máximo 64 caracteres" })
})