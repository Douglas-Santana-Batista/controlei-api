import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { Category } from "src/domain/entities/Category";
import { CategoryRepositoryInterface } from "src/domain/interfaces/CategoryRepositoryInterface";

export class FindCategoryCase {
  constructor(private categoryRepositoryInterface: CategoryRepositoryInterface) {}

  async executeFindByid(id_category: number): Promise<Category | null> {
    try {
      const categoryData = await this.categoryRepositoryInterface.findById(id_category);
      return categoryData;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }

  async executeFindAll(publicId: string): Promise<Category[] | null> {
    try {
      const categoryData = await this.categoryRepositoryInterface.findAll(publicId);
      return categoryData;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
