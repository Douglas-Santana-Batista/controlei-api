// src/application/useCases/category/FindAllPaginatedCategoryCase.ts
import { Category } from "src/domain/entities/Category";
import { CategoryRepositoryInterface } from "src/domain/interfaces/CategoryRepositoryInterface";
import { PaginationParams, PaginationResult } from "src/domain/types/PaginationTypes";
import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { AppError } from "src/shared/error/AppError";

export class FindAllPaginatedCategoryCase {
  constructor(private categoryRepository: CategoryRepositoryInterface) {}

  async execute(params: PaginationParams): Promise<PaginationResult<Category>> {
    try {
      if (params.page < 1) {
        throw new AppError("Page must be at least 1", 400);
      }

      if (params.limit < 1 || params.limit > 100) {
        throw new AppError("Limit must be between 1 and 100", 400);
      }

      return await this.categoryRepository.findAllPaginated(params);
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
