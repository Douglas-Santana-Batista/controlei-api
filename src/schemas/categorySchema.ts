import { z } from 'zod'
import { idSchema } from './shared.schema'

const categoriaBodySchema =z.object({
    descricao_categoria:z.string({
        required_error: "description is mandatory"
    })
    .min(3,"Name must be at least 3 characters long")
    .trim()
    .toLowerCase()
})

export const validationcategorybodySchema = categoriaBodySchema

export const validationIdcategoryParamsSchema = z.object({
    id_categoria:idSchema,
    id_usuario:idSchema
})