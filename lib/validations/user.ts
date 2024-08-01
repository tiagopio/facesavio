import * as z from 'zod'

export const UserValidation = z.object({
  profile_photo: z.union([z.literal(""), z.string().trim().url()]),
  name: z.string()
    .trim()
    .min(3, { message: "Seu nome deve ter no mínimo 3 caracteres" })
    .max(64, { message: "Seu nome deve ter no máximo 64 caracteres" })
  ,
  username: z.string()
    .min(4, { message: "O nome de usuário deve ter no mínimo 3 caracteres" })
    .max(64, { message: "O nome de usuário deve ter no máximo 64 caracteres" })
    .regex(/^[a-zA-Z0-9_-]+$/, { message: "O nome de usuário só pode conter letras, números e _ ou -" })
  ,
  bio: z.string()
    .trim()
    .min(3, { message: "Sua bio deve ter no mínimo 3 caracteres" })
    .max(1000, { message: "Sua bio deve ter no máximo 1000 caracteres" })
})