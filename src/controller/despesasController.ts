import { Request, Response, RequestHandler, NextFunction } from 'express'
import prisma from '../prisma'
import { despesasBodySchema, despesasIdSchema } from '../schemas/despesasSchema'

export const createExpense: RequestHandler = async  (req:Request, res:Response, next: NextFunction) =>{
    try {
        const { descricao_despesa, valor, parcela, tipo_pagamento } = despesasBodySchema.parse(req.body)
        const { id_usuario, id_categoria } = despesasIdSchema.parse(req.params)

        const newExpense = await prisma.despesas.create({
            data:{  descricao_despesa, valor, parcela, tipo_pagamento,
                usuario:{
                    connect:{
                        id_usuario
                    }
                },
                categoria:{
                    connect:{
                        id_categoria
                    }
                }
            }   
        })

        res.status(201).json({ message: "Expense created successfully", newExpense })
    } catch (error) {
        next(error)
    }
}