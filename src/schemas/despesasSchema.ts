import { z } from 'zod'
import { TipoPagamento } from '@prisma/client'
import { idSchema, stringSchema } from './shared.schema'

const pagamentoSchema = z.nativeEnum(TipoPagamento)

export const despesasBodySchema = z.object({
    descricao_despesa: stringSchema,
    valor: idSchema,
    parcela:idSchema.optional(),
    tipo_pagamento:pagamentoSchema.optional()
})

export const despesasIdSchema =z.object({
  id_usuario:idSchema,
  id_categoria:idSchema,
  id_subcategoria:idSchema
})

export const idParamSchemaExpense = z.object({id_despesa:idSchema})

export const updateExpenseSchema = z.object({
  descricao_despesa: z.string().optional(),
  valor: z.number().optional(),
  parcela: z.number().nullable().optional(),
  tipo_pagamento: pagamentoSchema.optional(),
});