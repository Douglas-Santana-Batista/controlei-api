import { Request, Response, RequestHandler, NextFunction } from 'express'
import { subcategoryIdParamsSchema, subCategorybodySchema, subcategoryupdateParamsSchema, subcategorydeleteParamsSchema } from '../schemas/subCategorySchema'
import prisma from '../models/prisma'



export const createsubCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subcategory_description } = subCategorybodySchema.parse(req.body)
        const { id_user, id_category } = subcategoryIdParamsSchema.parse(req.params)

        const createsubCategory = await prisma.subcategories.create({
            data: {
                subcategory_description,
                user: {
                    connect: { id_user }
                },
                categories: {
                    connect: { id_category }
                }
            }
        })
        res.status(201).json({message:"Created", createsubCategory})
    } catch (error) {
        next(error)
    }
}

export const getAllsubCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allSubCategory = await prisma.subcategories.findMany()

        if (allSubCategory.length === 0) {
            const error = new Error("There are no registered subcategory")
            return next(error);
        }
        res.status(201).json(allSubCategory)
    } catch (error) {
        next(error)
    }
}

export const updatesubCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_user, id_subcategories } = subcategoryupdateParamsSchema.parse(req.params)
        const { subcategory_description } =  subCategorybodySchema.parse(req.body)

        const updatesubCategory = await prisma.subcategories.update({
            where: {
                id_user,
                id_subcategories
            },
            data:{ subcategory_description }
        })
        res.status(201).json({message: "Subcategory updated successfully", updatesubCategory})

    } catch (error) {
        next(error)
    }
}

export const deletesubCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_subcategories} = subcategorydeleteParamsSchema.parse(req.params)

        const deletesubCategory = await prisma.subcategories.delete({
            where: { id_subcategories }
        })
        res.status(201).json({ message: "Subcategory deleted successfully ", deletesubCategory })
    } catch (error) {
        next(error)
    }
}