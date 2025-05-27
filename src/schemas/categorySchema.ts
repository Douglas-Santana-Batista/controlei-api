import { z } from 'zod'

const categoriaBodySchema =z.object({
    descricao_categoria:z.string({
        required_error: "description is mandatory"
    })
    .min(3,"Name must be at least 3 characters long")
    .trim()
    .toLowerCase()
})

export const categoryCreatSchema = categoriaBodySchema

export const categoryUpdateSchema = categoriaBodySchema

const categoryIdSchema = z.coerce.number().positive()

export const categoryIduserParamsSchema = z.object({
    id_usuario: categoryIdSchema
})

export const categoryIdcategoryParamsSchema = z.object({
    id_categoria: categoryIdSchema
})

export const categoryidUpdate = z.object({
    id_categoria: categoryIdSchema,
    id_usuario: categoryIdSchema
})