import { z } from "zod";
import { dateSchema, idSchema, MonetaryValueSchema, numberSchema } from "./shared.schema";

export const installmentsCreateBody = z.object({
    due_date:dateSchema,
    amount:MonetaryValueSchema,
    number:numberSchema,
    status:z.enum(['PENDING','PAID','OVERDUE']).optional()
})

export const installmentsUpdateBody = z.object({
    due_date:dateSchema.optional(),
    amount:MonetaryValueSchema.optional(),
    number:numberSchema.optional(),
    status:z.enum(['PENDING','PAID','OVERDUE']).optional()
})

export const installmentsCreateParams = z.object({
    id_user:idSchema
})

export const updateInstallmentParams = z.object({
    id_user:idSchema,
    id_installment:idSchema
})