import * as z from 'zod'

export const UserValidation = z.object({
  profile_photo: z.union([z.literal(""), z.string().trim().url()]),
  name: z.string().min(3, {
    message: "Seu nome deve ter no mínimo 3 caracteres"
  }).max(30),
  username: z.string().min(3, {
    message: "O nome de usuário deve ter no mínimo 3 caracteres"
  }).max(30),
  bio: z.string().min(3, {
    message: "Sua bio deve ter no mínimo 3 caracteres"
  }).max(1000),
})