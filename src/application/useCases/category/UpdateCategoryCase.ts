import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { Category } from "src/domain/entities/Category";
import { CategoryRepositoryInterface } from "src/domain/interfaces/CategoryRepositoryInterface";

export class UpdateCategoryCase {
  constructor(private categoryRepositoryInterface: CategoryRepositoryInterface) {}

  async executeUpdate(updateData: Category) {
    try {
      const categoryUpdated = await this.categoryRepositoryInterface.update(updateData);

      return categoryUpdated;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
