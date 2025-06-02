import { Request, Response, RequestHandler, NextFunction } from 'express'
import prisma from '../models/prisma'
import { despesasBodySchema, despesasIdSchema, idParamSchemaExpense, updateExpenseSchema } from '../schemas/expenseSchema'
import { AppError } from '../utils/AppError'

export const createExpense: RequestHandler = async  (req:Request, res:Response, next: NextFunction) =>{
    try {
        const { expense_description, value, Installments, payment_type } = despesasBodySchema.parse(req.body)
        const { id_user, id_category, id_subcategories } = despesasIdSchema.parse(req.params)

        const newExpense = await prisma.expenses.create({
            data:{  expense_description, value, Installments, payment_type,
                user:{connect:{id_user}},
                categories:{connect:{id_category}},
                Subcategories:{connect:{id_subcategories}}
            }
        })
        res.status(201).json({ message: "Expense created successfully", newExpense })
    } catch (error) {
        next(error)
    }
}

export const getAllExpense:RequestHandler = async (req:Request, res:Response, next:NextFunction ) =>{
    try {
        const getExpense = await prisma.expenses.findMany()
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
        const { id_expense } = idParamSchemaExpense.parse(req.params)

        const DeleteExpenseId = await prisma.expenses.delete({
            where:{id_expense}
        })
        res.status(201).json({message:"Expense deleted",DeleteExpenseId})
    } catch (error) {
        next(error)
    }
}

export const updateExpense:RequestHandler =  async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const { id_expense } = idParamSchemaExpense.parse(req.params)
        const { expense_description, value, installments, payment_type } = updateExpenseSchema.parse(req.body)

        const existingExpense = await prisma.expenses.findUnique({
        where: { id_expense }
        });
        
        if (!existingExpense) {
        throw new AppError('Expense not found', 404);
        }

        const fieldsToUpdate = { expense_description, value, installments, payment_type };

        const dataToUpdate = Object.fromEntries(
        Object.entries(fieldsToUpdate).filter(([_, v]) => v !== undefined)
        );

        const updateExpense = await prisma.expenses.update({
            where:{
                id_expense
            },data:dataToUpdate
        })
        res.status(201).json({message:"update complete", updateExpense})
    } catch (error) {
        next(error)
    }
}