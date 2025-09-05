import { Request, Response, RequestHandler, NextFunction } from "express";
import { subcategoryIdParamsSchema, subCategorybodySchema, subcategoryupdateParamsSchema, subcategorydeleteParamsSchema, updateSubCategorybodySchema, subcategoryGetSchema, subcategorygetuser } from "../schemas/subCategorySchema";
import prisma from "../models/prisma";
import { AppError } from "../utils/AppError";

export const createsubCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { description, value, payment_type, date, financial_flow } = subCategorybodySchema.parse(req.body);
    const { id_user, id_category } = subcategoryIdParamsSchema.parse(req.params);

    const createsubCategory = await prisma.subcategory.create({
      data: {
        description,
        value,
        payment_type,
        financial_flow,
        id_user,
        id_category,
      },
    });
    res.status(201).json({ message: "Created", createsubCategory });
  } catch (error) {
    next(error);
  }
};

export const getAllsubCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_user, id_category } = subcategorygetuser.parse(req.params);

    const allSubCategory = await prisma.subcategory.findMany({
      where: { id_user, id_category },
    });

    if (allSubCategory.length === 0) {
      const error = new Error("There are no registered subcategory");
      return next(error);
    }
    res.status(200).json(allSubCategory);
  } catch (error) {
    next(error);
  }
};

export const getSubcategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_category, id_user, id_subcategory } = subcategoryGetSchema.parse(req.params);

    const getsubcategory = await prisma.subcategory.findMany({
      where: { id_category, id_subcategory, id_user },
    });
    res.status(200).json(getsubcategory);
  } catch (error) {
    next(error);
  }
};

export const updatesubCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_user, id_category, id_subcategory } = subcategoryupdateParamsSchema.parse(req.params);
    const bodyData = updateSubCategorybodySchema.parse(req.body);

    const existingSubCategory = await prisma.subcategory.findUnique({
      where: { id_subcategory, id_category, id_user },
    });
    if (!existingSubCategory) {
      throw new AppError("SubCategory not found", 404);
    }

    const dataToUpdate = Object.fromEntries(Object.entries(bodyData).filter(([, v]) => v !== undefined));

    if (Object.keys(dataToUpdate).length === 0) {
      throw new AppError("No valid data provided for update", 400);
    }

    const updatesubCategory = await prisma.subcategory.update({
      where: {
        id_user,
        id_subcategory,
      },
      data: dataToUpdate,
    });
    res.status(200).json({ message: "Subcategory updated successfully", updatesubCategory });
  } catch (error) {
    next(error);
  }
};

export const deletesubCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_subcategory, id_category, id_user } = subcategorydeleteParamsSchema.parse(req.params);

    const deletesubCategory = await prisma.subcategory.delete({
      where: { id_subcategory, id_category, id_user },
    });
    res.status(200).json({
      message: "Subcategory deleted successfully ",
      deletesubCategory,
    });
  } catch (error) {
    next(error);
  }
};
