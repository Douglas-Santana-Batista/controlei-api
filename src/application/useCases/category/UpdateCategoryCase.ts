import { Category } from "src/domain/entities/Category";
import { CategoryRepositoryInterface } from "src/domain/interfaces/CategoryRepositoryInterface";
import { AppError } from "src/shared/error/AppError";

export class UpdateCategoryCase {
  constructor(private categoryRepositoryInterface: CategoryRepositoryInterface) {}

  async executeUpdate(updateData: Category) {
    if (!updateData.id_category) {
      throw new AppError("Category ID is required for update", 400);
    }

    const existingCategory = await this.categoryRepositoryInterface.findById(updateData.id_category);
    if (!existingCategory) {
      throw new AppError("Category not found", 404);
    }

    const updatedCategory = new Category(updateData.id_category, updateData.description ?? existingCategory.description, updateData.budget ?? existingCategory.budget, existingCategory.createdAt, new Date());

    const categoryUpdated = await this.categoryRepositoryInterface.update(updatedCategory);

    return categoryUpdated;
  }
}
