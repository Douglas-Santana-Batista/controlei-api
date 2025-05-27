import { z } from 'zod'
import { TipoPagamento } from '@prisma/client'

const pagamentoSchema = z.nativeEnum(TipoPagamento)

const numberSchema =z.coerce.number()

const stringSchema = z.string({required_error: "Name is mandatory"}).min(1,"Name must be at least 3 characters long").trim()

export const despesasBodySchema = z.object({
    descricao_despesa: stringSchema,
    valor: numberSchema,
    parcela:numberSchema.optional(),
    tipo_pagamento:pagamentoSchema.optional()
})

export const despesasIdSchema =z.object({
  id_usuario:numberSchema,
  id_categoria:numberSchema
})