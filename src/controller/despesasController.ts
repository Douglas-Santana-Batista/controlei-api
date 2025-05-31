import { Request, Response, RequestHandler, NextFunction, response } from 'express'
import prisma from '../prisma'
import { despesasBodySchema, despesasIdSchema, idParamSchemaExpense, updateExpenseSchema } from '../schemas/despesasSchema'
import { AppError } from '../utils/AppError'

export const createExpense: RequestHandler = async  (req:Request, res:Response, next: NextFunction) =>{
    try {
        const { descricao_despesa, valor, parcela, tipo_pagamento } = despesasBodySchema.parse(req.body)
        const { id_usuario, id_categoria, id_subcategoria } = despesasIdSchema.parse(req.params)

        const newExpense = await prisma.despesas.create({
            data:{  descricao_despesa, valor, parcela, tipo_pagamento,
                usuario:{connect:{id_usuario}},
                categoria:{connect:{id_categoria}},
                Subcategorias:{connect:{id_subcategoria}}
            }
        })
        res.status(201).json({ message: "Expense created successfully", newExpense })
    } catch (error) {
        next(error)
    }
}

export const getAllExpense:RequestHandler = async (req:Request, res:Response, next:NextFunction ) =>{
    try {
        const getExpense = await prisma.despesas.findMany()
        if(getExpense.length === 0){
            const error = new Error("There are no registered expenses")
            return  next(error)
        }        
        res.status(201).json(getExpense)
    } catch (error) {
        next(error)
    }
}

export const DeleteExpense:RequestHandler =  async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const { id_despesa } = idParamSchemaExpense.parse(req.params)

        const DeleteExpenseId = await prisma.despesas.delete({
            where:{id_despesa}
        })
        res.status(201).json({message:"Expense deleted",DeleteExpenseId})
    } catch (error) {
        next(error)
    }
}

export const updateExpense:RequestHandler =  async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const { id_despesa } = idParamSchemaExpense.parse(req.params)
        const { descricao_despesa, valor, parcela, tipo_pagamento } = updateExpenseSchema.parse(req.body)

        const existingExpense = await prisma.despesas.findUnique({
        where: { id_despesa }
        });
        
        if (!existingExpense) {
        throw new AppError('Expense not found', 404);
        }

        const fieldsToUpdate = { descricao_despesa, valor, parcela, tipo_pagamento };

        const dataToUpdate = Object.fromEntries(
        Object.entries(fieldsToUpdate).filter(([_, v]) => v !== undefined)
        );

        const updateExpense = await prisma.despesas.update({
            where:{
                id_despesa
            },data:dataToUpdate
        })
        res.status(201).json({message:"update complete", updateExpense})
    } catch (error) {
        next(error)
    }
}