import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextFunction, Request, Response } from 'express'

const JWT_SECRET = process.env.JWT_SECRET || '$2a$12$/GiGOz/okRpTaJlM.0vE/.xtunm1pgqsu4isN0Nn5T4Sh2Tu9DKsy'

export const createtoken = (id_user : number) => {
    return jwt.sign(
        {id: id_user},
        JWT_SECRET,
        {expiresIn: '1d'}
    )
}

export const comparePasswords = async (passwordEntered: string, encryptedpassword: string) =>{
    return await bcrypt.compare(passwordEntered, encryptedpassword)
}

export const authenticate = ( req:Request, res: Response , next: NextFunction) =>{
    const token = req.headers.authorization?.split(' ')[1]

    if(!token){
        return res.status(401).json({ erro: 'Acesso negado. Token ausente.' });
    }
    try {
        const DecodedData = jwt.verify(token, JWT_SECRET) as {id:string}
        req.user = DecodedData
        next()

    } catch (error) {
        res.status(400).json({ erro: 'Token inválido ou expirado' });
    }
}