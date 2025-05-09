import { z } from 'zod';

export const UserCreateSchema = z.object({
    nome: z.string({
        required_error: "Name is mandatory"
    })
    .min(3,"Name must be at least 3 characters long")
    .trim(),

    email:z.string()
        .email("invalid email")
        .transform(email => email.toLowerCase().trim()),
    
    senha:z.string()
        .min(8,"Password must be at least 8 characters long")
        .regex(/[A-Z]/,"Password must contain at least one capital letter")
        .regex(/[0-9]/,"Password must contain at least one number"),
    cpf:z.string()
        .length(11,"CPF must have 11 digits")
        .regex(/^\d+$/,"CPF must contain only numbers")

})

export const userIdParamsSchema = z.object({
    id_usuario: z.string().regex(/^\d+$/, "ID must be a number")
});