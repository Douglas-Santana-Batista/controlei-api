import { z } from 'zod'
import { idSchema, stringSchema } from './shared.schema'

export const subcategoryupdateParamsSchema = z.object({
    id_subcategories:idSchema,
    id_user:idSchema
})

export const subcategoryIdParamsSchema = z.object({
    id_user: idSchema,
    id_category: idSchema
})

export const subCategorybodySchema = z.object({subcategory_description:stringSchema})

export const subcategorydeleteParamsSchema = z.object({
    id_subcategories:idSchema
})