import { Request, Response, RequestHandler, NextFunction } from "express";
import prisma from "../models/prisma";
import { categorybodySchema, IdcategoryParamsSchema, IdDeletecategoryParamsSchema, IdupdatecategoryParamsSchema } from "../schemas/categorySchema";
import { AppError } from "../utils/AppError";

export const createCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { description, budget } = categorybodySchema.parse(req.body);
    const { id_user } = IdcategoryParamsSchema.parse(req.params);

    const newCategory = await prisma.category.create({
      data: { description, budget, id_user },
    });
    res.status(201).json({ message: "Category created successfully", newCategory });
    return;
  } catch (error) {
    next(error);
  }
};

export const updateCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_user, id_category } = IdupdatecategoryParamsSchema.parse(req.params);
    const bodyData = categorybodySchema.parse(req.body);

    const dataToUpdate = Object.fromEntries(Object.entries(bodyData).filter(([, v]) => v !== undefined));

    if (Object.keys(dataToUpdate).length === 0) {
      throw new AppError("No valid data provided for update", 400);
    }

    const newName = await prisma.category.update({
      where: { id_user, id_category },
      data: dataToUpdate,
    });
    res.status(200).json({ message: "Category audated successfully", newName });
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_user } = IdcategoryParamsSchema.parse(req.params);

    const allCategory = await prisma.category.findMany({
      where: { id_user },
    });
    if (allCategory.length === 0) {
      throw new AppError("There are no registered category", 404);
    }
    res.status(200).json(allCategory);
  } catch (error) {
    next(error);
  }
};

export const getCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_user, id_category } = IdupdatecategoryParamsSchema.parse(req.params);

    const allcategory = await prisma.category.findMany({
      where: { id_category, id_user },
    });
    res.status(200).json(allcategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_category } = IdDeletecategoryParamsSchema.parse(req.params);

    const deleteCategory = await prisma.category.delete({
      where: { id_category },
    });
    res.status(200).json({ message: "category deleted successfully", deleteCategory });
  } catch (error) {
    next(error);
  }
};
