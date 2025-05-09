import { z } from 'zod'

export const categoryCreatSchema = z.object({
    descricao_categoria:z.string({
        required_error: "description is mandatory"
    })
    .min(3,"Name must be at least 3 characters long")
    .trim()
    .toLowerCase(),
})

export const categoryUpdateSchema = z.object({
    descricao_categoria:z.string({
        required_error:"description is mandatory"
    })
    .min(3,"must be at least 3 characters long")
    .trim()
    .toLowerCase()
})

export const categoryIdParamsSchema = z.object({
    id_categoria:  z.string().regex(/^\d+$/, "ID must be a number")
})