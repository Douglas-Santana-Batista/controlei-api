import { Request, Response, RequestHandler, NextFunction } from 'express'
import prisma from '../models/prisma'
import bcrypt from 'bcrypt';
import { updateUserSchema, UserCreateSchema, userIdParamsSchema } from '../schemas/userSchema';
import { AppError } from '../utils/AppError';

export const createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { cpf, name, password, email } = UserCreateSchema.parse(req.body)
        const hashPassword = await bcrypt.hash(password, 10)

        const novoUsuario = await prisma.user.create({
            data: { name, email, password: hashPassword, cpf },
            select: {
                id_user: true,
                name: true,
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
        const mostrartodosUsuarios = await prisma.user.findMany()

        if (mostrartodosUsuarios.length === 0) {
            throw new AppError("There are no registered users", 404)
        }
        res.json(mostrartodosUsuarios);
        return;
    } catch (error) {
        return next(error);
    }

}

export const deleteUserByid: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { id_user } = userIdParamsSchema.parse(req.params)

        const deleteUser = await prisma.user.delete({
            where: { id_user },
        })
        res.status(200).json({ message: "User deleted successfully", deleteUser })
    } catch (error) {
        return next(error)
    }
}

export const updateUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_user } = userIdParamsSchema.parse(req.params)
        const { cpf, name, password, email } = updateUserSchema.parse(req.body)

        const existingUser = await prisma.user.findUnique({
            where: { id_user }
        });

        if (!existingUser) {
            throw new AppError("User not found", 404);
        }
        const fieldsToUpdate = { cpf, name, password, email };

        const dataToUpdate = Object.fromEntries(
        Object.entries(fieldsToUpdate).filter(([_, v]) => v !== undefined)
        );
        const updateuser = await prisma.user.update({
            where: { id_user }, data: dataToUpdate
        })
        res.status(201).json({message:"User updated", updateuser})
    } catch (error) {
        next(error)
    }
}