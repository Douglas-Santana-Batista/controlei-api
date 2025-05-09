import { Request, Response, RequestHandler, NextFunction } from 'express'
import prisma from '../prisma'
import { categoryCreatSchema, categoryUpdateSchema, categoryIdParamsSchema } from '../schemas/categorySchema'

export const createCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const validation = categoryCreatSchema.safeParse(req.body)
        const id_usuario = parseInt(req.params.id_usuario)

        if (!validation.success) {
            const error = new Error("Invalid description");
            error.name = "ValidationError";
            (error as any).details = validation.error.flatten();
            return next(error);
        }

        const { descricao_categoria } = validation.data


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
        res.status(201).json(newCategory)
        return
    } catch (error) {
        next(error)
    }

}

export const updateCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {id_usuario, id_categoria} = req.params;

        const validation = categoryUpdateSchema.safeParse(req.body)

        if (!validation.success) {
            const error = new Error("Invalid description");
            error.name = "ValidationError";
            (error as any).details = validation.error.flatten();
            return next(error);
        }

        const { descricao_categoria } = validation.data

        const usuarioId = parseInt(id_usuario)
        const categoriaId = parseInt(id_categoria)

        const newName = await prisma.categorias.update({
            where: {
                id_usuario:usuarioId,
                id_categoria:categoriaId
            },
            data: { descricao_categoria }
        })
        res.status(200).json(newName)
        return;
    } catch (error) {
        next(error)
    }
}

export const getAllCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const allCategory = await prisma.categorias.findMany()

        if(allCategory.length === 0){
            const error = new Error ("There are no registered category")
            return next(error);
        }

        res.status(200).json(allCategory)
    } catch (error) {
        next(error)
    }
}

export const deleteCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const validation = categoryIdParamsSchema.safeParse(req.params)

        if(!validation.success){
        const error = new Error ("Invalid id")
        error.name = "validation error";
        (error as any).details= validation.error.flatten()
        return next(error)
        }

        const { id_categoria } = validation.data

        const idCategory = parseInt(id_categoria)

        const deleteCategory = await prisma.categorias.delete({
            where:{ id_categoria: idCategory}
        })

        res.status(200).json({message: "category deleted successfully",deleteCategory})

    } catch (error) {
        next(error)
    }
}