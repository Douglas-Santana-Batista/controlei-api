import { Request, Response, RequestHandler, NextFunction } from 'express'
import prisma from '../prisma'
import bcrypt from 'bcrypt';
import { UserCreateSchema, userIdParamsSchema } from '../schemas/userSchema';

export const createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const validation = UserCreateSchema.safeParse(req.body)

        if (!validation.success) {
            const error = new Error("Invalid data");
            error.name = "ValidationError";
            (error as any).details = validation.error.flatten();
            return next(error);
        }

        const { cpf, nome, senha, email } = validation.data;

        const hashPassword = await bcrypt.hash(senha, 10)

        const novoUsuario = await prisma.usuarios.create({
            data: { nome, email, senha: hashPassword, cpf },
            select: {
                id_usuario: true,
                nome: true,
                email: true
            }
        });

        res.status(201).json(novoUsuario);
        return;
    } catch (error) {
        return next(error);
    }
}

export const getallUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const mostrartodosUsuarios = await prisma.usuarios.findMany()

        if (mostrartodosUsuarios.length === 0) {
            const error = new Error('There are no registered users')
            return next(error);
        }

        res.json(mostrartodosUsuarios);
        return;

    } catch (error) {
        return next(error);
    }

}

// remover depois
export const deleteAllUsers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

        await prisma.usuarios.deleteMany()

        res.status(200).json({ message: "Todos os usuários deletados com sucesso." })
        return;

    } catch (error) {
        return next(error);
    }
}

export const deleteUserByid: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const validation = userIdParamsSchema.parse(req.params)

        const { id_usuario } = validation

        const deleteUser = await prisma.usuarios.delete({
            where: { id_usuario: Number(id_usuario) },
        })

        res.status(200).json({ message: "User deleted successfully", deleteUser })
    } catch (error) {
        return next(error)
    }

}