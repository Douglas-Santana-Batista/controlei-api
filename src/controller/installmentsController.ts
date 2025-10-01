import { NextFunction, RequestHandler, Request, Response } from "express";
import { deleteInstallmentParams, getallInstallmentSchema, getinstallmentsSchema, installmentsCreateBody, installmentsCreateParams, installmentsUpdateBody, updateInstallmentParams } from "../schemas/installmentsSchema";
import prisma from "../infrastructure/database/prisma";
import { prepareData } from "../shared/utils/helperController";

export const createInstallments: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const installmentsData = installmentsCreateBody.parse(req.body);
    const { id_subcategory, id_user } = installmentsCreateParams.parse(req.params);

    const allData = { ...installmentsData, id_subcategory, id_user };

    const correctData = prepareData(allData);

    // Cria todas as parcelas em uma única transação
    const createdInstallments = await prisma.$transaction(correctData.map((data) => prisma.installment.create({ data })));
    res.status(201).json(createdInstallments);
  } catch (error) {
    next(error);
  }
};

export const deleteInstallment: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_subcategory, id_user } = deleteInstallmentParams.parse(req.params);

    const deleteinstallment = await prisma.installment.deleteMany({
      where: { id_subcategory, id_user },
    });

    res.status(200).json({ message: "installment deleted successfully", deleteinstallment });
  } catch (error) {
    next(error);
  }
};

export const getallInstallment: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_user } = getallInstallmentSchema.parse(req.params);

    const allInstallment = await prisma.installment.findMany({
      where: { id_user },
    });

    if (allInstallment.length === 0) {
      const error = new Error("There are no registered installment");
      return next(error);
    }

    res.status(200).json(allInstallment);
  } catch (error) {
    next(error);
  }
};

export const getinstallment: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_installment, id_user } = getinstallmentsSchema.parse(req.params);

    const getinstallment = await prisma.installment.findMany({
      where: { id_installment, id_user },
    });

    res.status(200).json(getinstallment);
  } catch (error) {
    next(error);
  }
};
