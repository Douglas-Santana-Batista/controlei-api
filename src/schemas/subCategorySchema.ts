import { z } from 'zod'
import { idSchema, stringSchema, MonetaryValueSchema, dateSchema } from './shared.schema'

export const subcategoryupdateParamsSchema = z.object({
    id_subcategory:idSchema,
    id_user:idSchema,
    id_category:idSchema
})

export const subcategoryIdParamsSchema = z.object({
    id_user: idSchema,
    id_category: idSchema
})

export const subcategoryGetSchema = z.object({
    id_user:idSchema,
    id_category:idSchema,
    id_subcategory:idSchema
})

export const subCategorybodySchema = z.object({
    date:dateSchema,
    description:stringSchema,
    value:MonetaryValueSchema,
    payment_type: z.enum(['CREDITO', 'DEBITO', 'BOLETO', 'PIX']),
    financial_flow:z.enum(['ENTRY', 'EXIT']),
})

export const updateSubCategorybodySchema = z.object({
    description:stringSchema.optional(),
    value:MonetaryValueSchema.optional(),
    payment_type: z.enum(['CREDITO', 'DEBITO', 'BOLETO', 'PIX']).optional(),
    financial_flow:z.enum(['ENTRY', 'EXIT']).optional(),
})

export const subcategorydeleteParamsSchema = z.object({
    id_subcategory:idSchema,
    id_user:idSchema,
    id_category:idSchema
})

export const subcategorygetuser = z.object({
    id_user:idSchema,
    id_category:idSchema
})