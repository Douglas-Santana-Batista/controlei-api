import { NextFunction, Response, Request } from "express";
import { CreateSubCategoryCase } from "src/application/useCases/subCategory/CreateSubCategoryCase";
import { DeleteSubCategoryCase } from "src/application/useCases/subCategory/DeleteSubCategoryCase";
import { FindSubCategoryCase } from "src/application/useCases/subCategory/FindSubcategoryCase";
import { UpdateSubCategoryUseCase } from "src/application/useCases/subCategory/UpdateSubCategoryUseCase";
import { AppError } from "src/shared/error/AppError";
import { number } from "zod";

export class SubCategoryController {
  constructor(private createSubcategoryCase: CreateSubCategoryCase, private findSubcategoryCase: FindSubCategoryCase, private updateSubcategory: UpdateSubCategoryUseCase, private deleteSubcategory: DeleteSubCategoryCase) {}

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

  async findById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { publicId, id_subcategory } = req.params;

      const idNumber = Number(id_subcategory);

      if (!publicId) throw new AppError("User id is required", 400);
      if (!id_subcategory) throw new AppError("SubCategory is requires", 400);

      const subCategoryFound = await this.findSubcategoryCase.findById(idNumber);
      return res.status(200).json({ message: "Category found", subCategoryFound });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { publicId } = req.params;

      if (!publicId) throw new AppError("User id is required", 400);

      const findAllSubCategory = await this.findSubcategoryCase.findAll(publicId);
      return res.status(200).json({ message: "SubCategoryes found", findAllSubCategory });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id_subcategory } = req.params;
      const dataToUpdate: any = {};

      const idNumber = Number(id_subcategory);

      const { description, value, payment_type, financial_flow } = req.body;

      if (description) dataToUpdate.description = description;
      if (value) dataToUpdate.value = value;
      if (payment_type) dataToUpdate.payment_type = payment_type;
      if (financial_flow) dataToUpdate.financial_flow = financial_flow;

      if (dataToUpdate.length === 0) throw new AppError("nothing to be updated", 400);

      dataToUpdate.updatedAt = new Date();

      const subcategoryUpdated = await this.updateSubcategory.executeUpdate(dataToUpdate, idNumber);
      return res.status(200).json({ message: "SubCategory updated", subcategoryUpdated });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { publicId, id_subcategory } = req.params;

      if (!publicId) throw new AppError("User id is required", 400);
      if (!id_subcategory) throw new AppError("SubCategory is requires", 400);

      const idSubcategory = Number(id_subcategory);

      await this.deleteSubcategory.delete(idSubcategory);
      res.status(200).json({ message: "Subcategory deleted" });
    } catch (error) {
      next(error);
    }
  }
}
