import { Request, Response, RequestHandler, NextFunction } from 'express'
import { subcategoryIdParamsSchema, subCategorybodySchema, subcategoryupdateParamsSchema } from '../schemas/subCategorySchema'
import prisma from '../prisma'



export const createsubCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { descricao_subcategoria } = subCategorybodySchema.parse(req.body)
        const { id_usuario, id_categoria } = subcategoryIdParamsSchema.parse(req.params)

        const createsubCategory = await prisma.subcategorias.create({
            data: {
                descricao_subcategoria,
                usuario: {
                    connect: { id_usuario }
                },
                categoria: {
                    connect: { id_categoria }
                }
            }
        })

        res.status(201).json(createsubCategory)
    } catch (error) {
        next(error)
    }
}

export const getAllsubCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allSubCategory = await prisma.subcategorias.findMany()

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
        const { id_usuario, id_subcategoria } = subcategoryupdateParamsSchema.parse(req.params)
        const { descricao_subcategoria } =  subCategorybodySchema.parse(req.body)

        const updatesubCategory = await prisma.subcategorias.update({
            where: {
                id_usuario,
                id_subcategoria
            },
            data:{ descricao_subcategoria }
        })

        res.status(201).json({message: "Subcategory updated successfully", updatesubCategory})

    } catch (error) {
        next(error)
    }
}

export const deletesubCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_usuario, id_subcategoria} = subcategoryupdateParamsSchema.parse(req.params)

        const deletesubCategory = await prisma.subcategorias.delete({
            where: { id_subcategoria, id_usuario }
        })

        res.status(201).json({ message: " Subcategory deleted successfully ", deletesubCategory })
    } catch (error) {
        next(error)
    }
}