import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { Category } from "src/domain/entities/Category";
import { CategoryRepositoryInterface } from "src/domain/interfaces/CategoryRepositoryInterface";

export class CreateCategoryCase {
  constructor(private categoryRepositoryInterface: CategoryRepositoryInterface) {}

  async executeCreate(category: Category, publicId: string): Promise<Category> {
    try {
      const categoryData = await this.categoryRepositoryInterface.create(category, publicId);
      return categoryData;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
