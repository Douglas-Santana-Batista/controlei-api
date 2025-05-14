import { Request, Response, RequestHandler, NextFunction } from 'express'
import prisma from '../prisma'
import { categoryCreatSchema, categoryUpdateSchema, categoryIdParamsSchema } from '../schemas/categorySchema'

export const createCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const validation = categoryCreatSchema.parse(req.body)
        const id_usuario = parseInt(req.params.id_usuario)

        const { descricao_categoria } = validation

        const newCategory = await prisma.categorias.create({
            data: {
                descricao_categoria,
                usuario: {
                    connect: {
                        id_usuario
                    }
                }
            }
        })
        res.status(201).json({message: "Category created successfully",newCategory})
        return
    } catch (error) {
        next(error)
    }

}

export const updateCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { id_usuario, id_categoria } = req.params;
        const validation = categoryUpdateSchema.parse(req.body)

        const { descricao_categoria } = validation

        const newName = await prisma.categorias.update({
            where: {
                id_usuario: Number(id_usuario),
                id_categoria: Number(id_categoria)
            },
            data: { descricao_categoria }
        })
        res.status(200).json({message: "Category audated successfully",newName})
        return;
    } catch (error) {
        next(error)
    }
}

export const getAllCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const allCategory = await prisma.categorias.findMany()

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

        const validation = categoryIdParamsSchema.parse(req.params)

        const { id_categoria } = validation

        const idCategory = parseInt(id_categoria)

        const deleteCategory = await prisma.categorias.delete({
            where: { id_categoria: idCategory }
        })

        res.status(200).json({ message: "category deleted successfully", deleteCategory })

    } catch (error) {
        next(error)
    }
}