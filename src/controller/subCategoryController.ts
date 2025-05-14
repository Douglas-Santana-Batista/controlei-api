import { Request, Response, RequestHandler, NextFunction } from 'express'
import { subcategoryIdParamsSchema, subCategorySchema } from '../schemas/subCategorySchema'
import prisma from '../prisma'
import { string } from 'zod'


export const createsubCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validation = subCategorySchema.safeParse(req.body)
        const id_usuario = req.params.id_usuario;
        const id_categoria = req.params.id_catedoria;

        if (!validation.success) {
            const error = new Error("Invalid description");
            error.name = "ValidationError";
            (error as any).details = validation.error.flatten();
            return next(error);
        }

        const { descricao_subcategoria } = validation.data

        const idUser = parseInt(id_usuario)
        const idCategory = parseInt(id_categoria)

        const createsubCategory = await prisma.subcategorias.create({
            data: {
                descricao_subcategoria,
                usuario: {
                    connect: { id_usuario: idUser }
                },
                categoria: {
                    connect: { id_categoria: idCategory }
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
        const validationId = subcategoryIdParamsSchema.parse(req.params)
        const validarionBody =  subCategorySchema.parse(req.body)

        
        const { id_usuario, id_subcategoria } = validationId
        const { descricao_subcategoria } = validarionBody


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
        const { id_usuario, id_subcategoria} = req.params

        const validation = subcategoryIdParamsSchema.safeParse(req.params)

        if (!validation.success) {
            const error = new Error("Invalid id")
            error.name = "validation error";
            (error as any).details = validation.error.flatten()
            return next(error)
        }

        const idUser = parseInt(id_usuario)
        const idSubCategory = parseInt(id_subcategoria)

        const deletesubCategory = await prisma.subcategorias.delete({
            where: { id_subcategoria: idSubCategory, id_usuario: idUser }
        })

        res.status(201).json({ message: " Subcategory deleted successfully ", deletesubCategory })
    } catch (error) {
        next(error)
    }
}