import { Request, Response, RequestHandler, NextFunction } from 'express'
import { validationBodyRevenue, validationIdRevenueSchema } from '../schemas/revenueSchema'


export const createRevenue: RequestHandler = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const { revenue_description, value } = validationBodyRevenue.parse(req.body)
        const { id_user, id_category, id_subcategories } = validationIdRevenueSchema.parse(req.params)
    } catch (error) {
        next(error)
    }
}