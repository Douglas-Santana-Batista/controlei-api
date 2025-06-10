import { NextFunction, RequestHandler, Request , Response } from "express";
import { installmentsCreateBody, installmentsCreateParams, installmentsUpdateBody, updateInstallmentParams } from "../schemas/installmentsSchema";
import prisma from "../models/prisma";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/AppError";


export const createInstallments:RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
    try {

        // Função para adicionar meses a uma data de forma segura
        function addMonths(date: Date, months: number): Date {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + months);
  
        // Ajuste para casos onde o dia original não existe no novo mês
        if (newDate.getDate() !== date.getDate()) {
        newDate.setDate(0); // Vai para o último dia do mês anterior
        }
  
        return newDate;
        }

        const { due_date, amount, number, status } = installmentsCreateBody.parse(req.body)
        const { id_user } = installmentsCreateParams.parse(req.params)

        // Calcula o valor de cada parcela (ajustando diferença de centavos)
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
        id_user: id_user
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