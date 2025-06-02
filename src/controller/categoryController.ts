import { Request, Response, RequestHandler, NextFunction } from 'express'
import prisma from '../models/prisma'
import {validationcategorybodySchema, validationIdcategoryParamsSchema, validationIdDeletecategoryParamsSchema, validationIdupdatecategoryParamsSchema } from '../schemas/categorySchema'

export const createCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { category_description } = validationcategorybodySchema.parse(req.body)
        const { id_user } = validationIdcategoryParamsSchema.parse(req.params)

        const newCategory = await prisma.categories.create({
            data: {
                category_description,
                id_user
            }
        })
        res.status(201).json({ message: "Category created successfully", newCategory })
        return
    } catch (error) {
        next(error)
    }

}

export const updateCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { id_user, id_category } = validationIdupdatecategoryParamsSchema.parse(req.params);
        const { category_description } = validationcategorybodySchema.parse(req.body)

        const newName = await prisma.categories.update({
            where: {
                id_user,
                id_category
            },
            data: { category_description }
        })
        res.status(200).json({ message: "Category audated successfully", newName })
        return;
    } catch (error) {
        next(error)
    }
}

export const getAllCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const allCategory = await prisma.categories.findMany()

        if (allCategory.length === 0) {
            const error = new Error("There are no registered category")
            return next(error);
        }

        res.status(200).json(allCategory)
    } catch (error) {
        next(error)
    }
}

export const deleteCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { id_category } = validationIdDeletecategoryParamsSchema.parse(req.params)

        const deleteCategory = await prisma.categories.delete({
            where: { id_category }
        })

        res.status(200).json({ message: "category deleted successfully", deleteCategory })
    } catch (error) {
        next(error)
    }
}