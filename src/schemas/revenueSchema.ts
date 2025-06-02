import { z } from 'zod'
import { idSchema, stringSchema } from './shared.schema'


export const validationBodyRevenue = z.object({
    revenue_description:stringSchema,
    value:idSchema,
    installments:idSchema.optional()
})

export const validationIdRevenueSchema = z.object({
    id_user:idSchema,
    id_category:idSchema,
    id_subcategories:idSchema.optional()
})