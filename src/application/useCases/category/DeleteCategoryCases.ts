import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { CategoryRepositoryInterface } from "src/domain/interfaces/CategoryRepositoryInterface";
import { AppError } from "src/shared/error/AppError";

export class DeleteCategoryCases {
  constructor(private categoryRepositoryInterface: CategoryRepositoryInterface) {}

  async executeDelete(id_category: number): Promise<void> {
    try {
      const existing = await this.categoryRepositoryInterface.findById(id_category);

      if (!existing) {
        throw new AppError("Category not found", 404);
      }
      const categoryDeleted = await this.categoryRepositoryInterface.delete(id_category);
      return categoryDeleted;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
