import { z } from 'zod'


const bodySchema = z.string({required_error: "description is mandatory"})
    .min(1,"Subcategory must be at least 2 characters long")
    .trim().toLowerCase().min(1,"Subcategory must be at least 2 characters long")

const idSchema = z.coerce.number().positive()

export const subcategoryupdateParamsSchema = z.object({
    id_subcategoria:idSchema,
    id_usuario:idSchema
})

export const subcategoryIdParamsSchema = z.object({
    id_usuario: idSchema,
    id_categoria: idSchema
})

export const subCategorybodySchema = z.object({
    descricao_subcategoria:bodySchema
})