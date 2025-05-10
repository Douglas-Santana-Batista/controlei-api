import { Request, Response, RequestHandler, NextFunction } from 'express'
import { subCategorySchema } from '../schemas/subCategorySchema'
import prisma from '../prisma'


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
                    connect: { id_usuario:idUser } 
                },
                categoria: {
                    connect: { id_categoria:idCategory }
                }
            }
        })

        res.status(201).json(createsubCategory)
    } catch (error) {
        next(error)
    }
}