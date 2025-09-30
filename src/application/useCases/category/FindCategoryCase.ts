import { Category } from "src/domain/entities/Category";
import { CategoryRepositoryInterface } from "src/domain/interfaces/CategoryRepositoryInterface";

export class FindCategoryCase {
  constructor(private categoryRepositoryInterface: CategoryRepositoryInterface) {}

  async executeFindByid(id_category: number): Promise<Category | null> {
    const categoryData = await this.categoryRepositoryInterface.findById(id_category);
    return categoryData;
  }

  async executeFindAll(): Promise<Category[] | null> {
    const categoryData = await this.categoryRepositoryInterface.findAll();
    return categoryData;
  }
}
