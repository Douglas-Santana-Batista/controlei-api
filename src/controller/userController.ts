import { Request, Response, RequestHandler, NextFunction } from 'express'
import prisma from '../models/prisma'
import { loginSchema, updateUserSchema, UserCreateSchema, userIdParamsSchema } from '../schemas/userSchema';
import { AppError } from '../utils/AppError';
import { comparePasswords, createToken } from '../utils/authUtils';
import bcrypt from 'bcrypt';


export const createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { cpf, name, password, email } = UserCreateSchema.parse(req.body)
        const hashPassword = await bcrypt.hash(password, 10)

        const newUsuario = await prisma.user.create({
            data: { name, email, password: hashPassword, cpf },
            select: {
                id_user: true,
                name: true,
                email: true
            }
        });
        res.status(201).json(newUsuario);
    } catch (error) {
        next(error);
    }
}

export const getUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { id_user } = userIdParamsSchema.parse(req.params)

        const getUsers = await prisma.user.findMany({
            where:{ id_user }
        })

        if (getUsers.length === 0) {
            throw new AppError("There are no registered users", 404)
        }
        res.json(getUsers);
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

        if (password) { const hashPassword = await bcrypt.hash(password, 10); 
            dataToUpdate.password = hashPassword; 
        }

        const updateuser = await prisma.user.update({
            where: { id_user }, data: dataToUpdate
        })
        res.status(200).json({message:"User updated", updateuser})
    } catch (error) {
        next(error)
    }
}

export const login:RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = loginSchema.parse(req.body)

    try {
        const userLogin = await prisma.user.findUnique({where:{email}})

        if(!userLogin){
            throw new AppError("user does not exist", 400)
        }

        const validationPassword = await comparePasswords(password, userLogin.password)

        if(!validationPassword){
            throw new AppError("invalid crededntials", 400)
        }

        const token = createToken(userLogin.id_user)

        const { password:_,cpf, ...safeUser } = userLogin;


        res.status(200).json({token, safeUser})

    } catch (error) {
        next(error)
    }
}

export const getAllUser:RequestHandler = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const alluser = await prisma.user.findMany()
        res.status(200).json(alluser)
    } catch (error) {
        next(error)
    }
}