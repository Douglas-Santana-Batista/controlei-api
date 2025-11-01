import { NextFunction, Response, Request } from "express";
import { CreateSubCategoryCase } from "src/application/useCases/subCategory/CreateSubCategoryCase";
import { AppError } from "src/shared/error/AppError";

export class SubCategoryController {
  constructor(private createSubcategoryCase: CreateSubCategoryCase) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
        throw new AppError("Request body is required and must be a valid JSON object", 400);
      }

      const { description, value } = req.body;
      const { publicId, id_category } = req.params;

      if (!description) throw new AppError("Description is missing", 400);
      if (!value) throw new AppError("Value is missing", 400);
      if (!publicId) throw new AppError("User id is required", 400);
      if (!id_category) throw new AppError("Category id is required", 400);

      if (typeof description !== "string") throw new AppError("Description must be a string", 400);
      if (typeof value !== "number") throw new AppError("Value must be a number", 400);
      if (typeof publicId !== "string") throw new AppError("User id must be a string", 400);

      if (description.trim().length === 0) throw new AppError("Description cannot be empty", 400);
      if (value < 0) throw new AppError("Value cannot be negative", 400);

      const categoryId = Number(id_category);
      if (isNaN(categoryId)) throw new AppError("Category id must be a valid number", 400);

      const subcategoryData = await this.createSubcategoryCase.executeCreate(req.body, categoryId, publicId);

      return res.status(201).json({ message: "Subcategory created successfully", subcategoryData });
    } catch (error) {
      next(error);
    }
  }
}
