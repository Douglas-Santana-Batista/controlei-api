import { z } from 'zod'
import { idSchema, stringSchema } from './shared.schema'

export const subcategoryupdateParamsSchema = z.object({
    id_subcategoria:idSchema,
    id_usuario:idSchema
})

export const subcategoryIdParamsSchema = z.object({
    id_usuario: idSchema,
    id_categoria: idSchema
})

export const subCategorybodySchema = z.object({descricao_subcategoria:stringSchema})

export const subcategorydeleteParamsSchema = z.object({
    id_subcategoria:idSchema
})