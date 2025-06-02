import { Request, Response, RequestHandler, NextFunction } from 'express'
import { validationBodyRevenue, validationIdRevenueSchema } from '../schemas/revenueSchema'
import { AppError } from '../utils/AppError'
import { createRevenueService } from '../services/revenueServices'


export const createRevenue: RequestHandler = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const { revenue_description, value, installments } = validationBodyRevenue.parse(req.body)
        const { id_user, id_category, id_subcategories } = validationIdRevenueSchema.parse(req.params)

        if(!id_user || !id_category || !value){
            return next(new AppError("id_user, id_category, id_subcategory, value are mandatory", 400))
        }

        const newRevenue = await createRevenueService({
            revenue_description,
            value,
            id_user,
            id_category,
            id_subcategories,
            installments
        })

        res.status(201).json(newRevenue)

    } catch (error) {
        next(error)
    }
}