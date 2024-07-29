import { z } from "zod";

export type Query = z.infer<typeof querySchema>;
export const querySchema = z.object({
    query: z.string(),
})