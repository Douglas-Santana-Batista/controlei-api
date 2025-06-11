import { NextFunction, RequestHandler, Request , Response } from "express";
import { deleteInstallmentParams, getinstallmentsSchema, installmentsCreateBody, installmentsCreateParams, installmentsUpdateBody, updateInstallmentParams } from "../schemas/installmentsSchema";
import prisma from "../models/prisma";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/AppError";
import { addMonths } from "../utils/helperController";


export const createInstallments:RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
    try {

        const { due_date, amount, number, status } = installmentsCreateBody.parse(req.body)
        const { id_user, id_subcategory } = installmentsCreateParams.parse(req.params)

        const totalAmount = new Prisma.Decimal(amount);
        const installmentValue = totalAmount.dividedBy(number).toDecimalPlaces(2);
        const lastInstallmentAdjustment = totalAmount.minus(installmentValue.times(number - 1));

        const installmentsData = Array.from({ length: number }, (_, i) => {
        const isLast = i === number - 1;
        const parcelValue = isLast ? lastInstallmentAdjustment : installmentValue;
            return {
                due_date: addMonths(new Date(due_date), i),
                amount: parcelValue,
                number: i + 1,
                status: status,
                id_user: id_user,
                id_subcategory
            };
        });

        // Cria todas as parcelas em uma única transação
        const createdInstallments = await prisma.$transaction(
            installmentsData.map(data => prisma.installment.create({ data }))
        );
        res.status(201).json(createdInstallments);
    } catch (error) {
        next(error)
    }
}

export const updateInstallments:RequestHandler = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const bodyData = installmentsUpdateBody.parse(req.body)
        const { id_installment, id_user } = updateInstallmentParams.parse(req.params)

        const existingInstallment = await prisma.installment.findUnique({
            where:{ id_installment, id_user}
        })
        if(!existingInstallment){
            throw new AppError("Installment not found", 400)
        }

        const dataToUpdate = Object.fromEntries(
            Object.entries(bodyData).filter(([_, v])=> v !== undefined)
        )
        if(Object.keys(dataToUpdate).length === 0) {
            throw new AppError("No valid data provided for update", 400)
        }

        const updateInstallment = await prisma.installment.update({
            where:{id_installment, id_user},
            data:dataToUpdate
        })

        res.status(200).json({message: "Installments updated succssfully", updateInstallment})
    } catch (error) {
        next(error)
    }
}

export const deleteInstallment:RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { id_installment, id_user} =  deleteInstallmentParams.parse(req.params)

        const deleteinstallment = await prisma.installment.delete({
            where:{id_installment, id_user}
        })

        res.status(200).json({message:"installment deleted successfully", deleteinstallment})
    } catch (error) {
        next(error)
    }
}

export const getallInstallment:RequestHandler = async (req:Request , res:Response, next:NextFunction) =>{
    try {
        const { id_user } = installmentsCreateParams.parse(req.params)

        const allInstallment = await prisma.installment.findMany({
            where:{ id_user }
        })

        if (allInstallment.length === 0) {
            const error = new Error("There are no registered subcategory")
            return next(error);
        }

        res.status(200).json(allInstallment)
    } catch (error) {
        next(error)
    }
}

export const getinstallment:RequestHandler = async (req:Request, res:Response, next:NextFunction)  =>{
    try {
        const { id_installment, id_user } = getinstallmentsSchema.parse(req.params)

        const getinstallment = await prisma.installment.findMany({
            where:{ id_installment, id_user }
        })

        res.status(200).json(getinstallment)
    } catch (error) {
        next(error)
    }
}