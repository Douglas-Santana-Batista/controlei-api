import { Request, Response, RequestHandler, NextFunction } from 'express'
import prisma from '../prisma'
import bcrypt from 'bcrypt';
import { updateUserSchema, UserCreateSchema, userIdParamsSchema } from '../schemas/userSchema';
import { AppError } from '../utils/AppError';

export const createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { cpf, nome, senha, email } = UserCreateSchema.parse(req.body)
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
    } catch (error) {
        next(error);
    }
}

export const getallUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const mostrartodosUsuarios = await prisma.usuarios.findMany()

        if (mostrartodosUsuarios.length === 0) {
            throw new AppError("There are no registered users", 404)
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
    } catch (error) {
        return next(error);
    }
}

export const deleteUserByid: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { id_usuario } = userIdParamsSchema.parse(req.params)

        const deleteUser = await prisma.usuarios.delete({
            where: { id_usuario },
        })
        res.status(200).json({ message: "User deleted successfully", deleteUser })
    } catch (error) {
        return next(error)
    }
}

export const updateUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_usuario } = userIdParamsSchema.parse(req.params)
        const { cpf, nome, senha, email } = updateUserSchema.parse(req.body)

        const existingUser = await prisma.usuarios.findUnique({
            where: { id_usuario }
        });

        if (!existingUser) {
            throw new AppError("User not found", 404);
        }
        const fieldsToUpdate = { cpf, nome, senha, email };

        const dataToUpdate = Object.fromEntries(
        Object.entries(fieldsToUpdate).filter(([_, v]) => v !== undefined)
        );
        const updateuser = await prisma.usuarios.update({
            where: { id_usuario }, data: dataToUpdate
        })
        res.status(201).json({message:"User updated", updateuser})
    } catch (error) {
        next(error)
    }
}