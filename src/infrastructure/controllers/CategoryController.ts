import { NextFunction, Response, Request } from "express";
import { CreateCategoryCase } from "src/application/useCases/category/createCategoryCase";
import { FindCategoryCase } from "src/application/useCases/category/FindCategoryCase";
import { UpdateCategoryCase } from "src/application/useCases/category/UpdateCategoryCase";
import { Amount } from "src/domain/entities/Amount";
import { Category } from "src/domain/entities/Category";
import { AppError } from "src/shared/error/AppError";
import { FindAllPaginatedCategoryCase } from "src/application/useCases/category/FindAllCategoryPaginedCase";
import { DeleteCategoryCases } from "src/application/useCases/category/DeleteCategoryCases";

export class CategoryController {
  constructor(
    private categorycreateCase: CreateCategoryCase,
    private categoryFindCase: FindCategoryCase,
    private updateCategory: UpdateCategoryCase,
    private deleteCategory: DeleteCategoryCases,
    private findAllPaginatedCategoryCase: FindAllPaginatedCategoryCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
        throw new AppError("Request body is required and must be a valid JSON object", 400);
      }

      const { description, budget } = req.body;
      const { publicId } = req.params;

      if (!description || budget === undefined) {
        throw new AppError("Missing required fields: description and budget", 400);
      }
      if (!publicId) {
        throw new AppError("Missing publicId parameter", 400);
      }

      if (typeof description !== "string") {
        throw new AppError("Description must be a string", 400);
      }
      if (typeof budget !== "number") {
        throw new AppError("Budget must be a number", 400);
      }

      if (description.trim().length === 0) {
        throw new AppError("Description cannot be empty", 400);
      }
      if (budget < 0) {
        throw new AppError("Budget cannot be negative", 400);
      }

      let amountEntity: Amount;
      let category: Category;

      amountEntity = new Amount(budget);
      category = new Category(0, description.trim(), amountEntity, new Date(), new Date());

      const CategoryData = await this.categorycreateCase.executeCreate(category, publicId);

      return res.status(201).json({
        message: "Category created successfully",
        user: CategoryData,
      });
    } catch (error) {
      next(error);
    }
  }

  async find(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id_category } = req.params;

      const idNumber = Number(id_category);

      if (!id_category) {
        throw new AppError("id is missing", 404);
      }
      if (idNumber === undefined) {
        throw new AppError("id is missing", 404);
      }

      const categoryfound = await this.categoryFindCase.executeFindByid(idNumber);

      if (!categoryfound) {
        throw new AppError("Category not find", 404);
      }

      return res.status(201).json({ message: "category find", Category: categoryfound });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { publicId } = req.params;

      if (!publicId) {
        throw new AppError("id is missing", 404);
      }

      const allCategory = await this.categoryFindCase.executeFindAll(publicId);

      return res.status(201).json({ message: "all category", Category: allCategory });
    } catch (error) {
      next(error);
    }
  }

  async findAllPaginated(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = Math.max(1, Number(req.query.page) || 1);
      const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

      const result = await this.findAllPaginatedCategoryCase.execute({ page, limit });

      res.status(200).json({
        success: true,
        message: "Categories retrieved successfully",
        data: {
          categories: result.data.map((category) => this.toCategoryResponse(category)),
        },
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { description, budget } = req.body;
      const { id_category } = req.params;
      const descriptionStr = String(description);
      const id = Number(id_category);
      const numberBudget = Number(budget);
      const newBudget = new Amount(numberBudget);

      if (!id_category) {
        throw new AppError("Category ID is required for update", 400);
      }
      const categoryData = await this.categoryFindCase.executeFindByid(id);

      if (!categoryData) {
        throw new AppError("Category not  found", 404);
      }

      const dataToUpdate: any = {};

      if (description !== undefined) {
        dataToUpdate.description = descriptionStr;
      }

      if (budget !== undefined) {
        dataToUpdate.budget = newBudget;
      }

      const categroyUpdated = await this.updateCategory.executeUpdate(dataToUpdate, id);

      return res.status(201).json({ message: "category updated", Category: categroyUpdated });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id_category } = req.body;

      if (!id_category) {
        throw new AppError("id  is required", 404);
      }

      const categoryDeleted = await this.deleteCategory.executeDelete(id_category);

      return res.status(200).json({ message: "Category deleted", categoryDeleted });
    } catch (error) {
      next(error);
    }
  }

  private toCategoryResponse(category: Category) {
    return {
      id: category.id_category,
      description: category.description,
      budget: category.getAmount(),
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
