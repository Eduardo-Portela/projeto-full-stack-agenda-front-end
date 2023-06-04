import {z} from "zod"

export const registerSchema = z.object({
    fullName: z.string(),
    email: z.string().email("Deve ser um email valido!"),
    phone: z.string(),
    password: z.string()
})

export const updateSchema = registerSchema.extend({
    fullName: z.string().optional().nullish(),
    email: z.string().email("Deve ser um email valido!").optional().nullish(),
    phone: z.string().optional().nullish(),
    password: z.string().optional().nullish()
}).partial()

export const updateSchemaContact = registerSchema.extend({
    fullName: z.string().optional().nullish(),
    email: z.string().email("Deve ser um email valido!").optional().nullish(),
    phone: z.string().optional().nullish(),
}).partial()

export const addContactSchema = registerSchema.omit({
    password: true
})

export type registerData = z.infer<typeof registerSchema>
export type addContactData = z.infer<typeof addContactSchema>
export type updateContactData = Partial<typeof updateSchemaContact>
export type UpdateUserData = Partial<typeof updateSchema>