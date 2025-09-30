import { Category } from "src/domain/entities/Category";
import { CategoryRepositoryInterface } from "src/domain/interfaces/CategoryRepositoryInterface";
import { AppError } from "src/utils/AppError";

export class UpdateCategoryCase {
  constructor(private categoryRepositoryInterface: CategoryRepositoryInterface) {}

  async executeUpdate(id_category: number, updateData: Category) {
    const dataToUpdate: any = {};

    if (updateData.description !== undefined) {
      dataToUpdate.description = updateData.description;
    }

    if (updateData.budget !== undefined) {
      updateData.budget = updateData.budget;
    }

    if (Object.keys(updateData).length === 0) {
      throw new AppError("No data to update", 404);
    }
    updateData.updatedAt = new Date();

    const categoryUpdated = await this.categoryRepositoryInterface.update(id_category, updateData);

    return categoryUpdated;
  }
}
