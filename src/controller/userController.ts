import { Request, Response, RequestHandler } from 'express'
import prisma from '../prisma'
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

export const createUser: RequestHandler = async (req: Request, res: Response) => {

    const { cpf, nome, senha, email } = req.body;

    if (!nome || !email || !senha || !cpf) {
        res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }

    try {

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(req.body.senha, saltRounds)

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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                res.status(409).json({
                    error: 'Já existe um usuário com este email ou cpf'
                });
            }
        }
    }

}

export const getallUser: RequestHandler = async (req: Request, res: Response) => {

    try {
        const mostrartodosUsuarios = await prisma.usuarios.findMany()

        if (mostrartodosUsuarios.length === 0) {
            res.status(404).json({ message: "consulta  realizada com sucesso, mas não tem usuarios." })
        }

        res.json(mostrartodosUsuarios);

    } catch (error) {
        res.status(500).json({ message: "Não foi possível fazer a busca, tente novamente" });
    }

}

export const deleteAllUsers: RequestHandler = async (req: Request, res: Response) => {
    try {

        await prisma.usuarios.deleteMany()

        res.status(200).json({ message: "Todos os usuários deletados com sucesso." })

    } catch (error) {

        res.status(500).json({ message: "erro, tente novamente" })
    }
}

export const deleteUserByid: RequestHandler = async (req: Request, res: Response) => {

    try {

        const { id_usuario } = req.params;

        if (!id_usuario) {
            res.status(400).json({ message: "usuário não fornecido" })
        }

        const deleteUser = await prisma.usuarios.delete({
            where: { id_usuario: Number(id_usuario) },
        })

        res.status(200).json({ message: "Ususário deletado com sucesso", deleteUser })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                res.status(404).json({ message: "Usuário não encontrado" });
            }
        }
    }

}