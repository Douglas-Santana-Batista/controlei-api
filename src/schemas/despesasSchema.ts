import { z } from 'zod'
import { paymentType } from '@prisma/client'
import { idSchema, stringSchema } from './shared.schema'

const pagamentoSchema = z.nativeEnum(paymentType)

export const despesasBodySchema = z.object({
    expense_description: stringSchema,
    value: idSchema,
    Installments:idSchema.optional(),
    payment_type:pagamentoSchema.optional()
})

export const despesasIdSchema =z.object({
  id_user:idSchema,
  id_category:idSchema,
  id_subcategories:idSchema
})

export const idParamSchemaExpense = z.object({id_expense:idSchema})

export const updateExpenseSchema = z.object({
  expense_description: z.string().optional(),
  value: z.number().optional(),
  installments: z.number().nullable().optional(),
  payment_type: pagamentoSchema.optional(),
});