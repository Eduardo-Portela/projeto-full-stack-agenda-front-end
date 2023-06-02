import {z} from "zod"

export const registerSchema = z.object({
    fullName: z.string(),
    email: z.string().email("Deve ser um email valido!"),
    phone: z.string(),
    password: z.string()
})

export type registerData = z.infer<typeof registerSchema>