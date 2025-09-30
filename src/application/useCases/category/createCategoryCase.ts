import { Amount } from "src/domain/entities/Amount";
import { Category } from "src/domain/entities/Category";
import { CategoryRepositoryInterface } from "src/domain/interfaces/CategoryRepositoryInterface";

export class CreateCategoryCase {
  constructor(private categoryRepositoryInterface: CategoryRepositoryInterface) {}

  async executeCreate(category: Category, publicId: string): Promise<Category> {
    const amountEntity = new Amount(category.getAmount());
    const newCategory = new Category(category.id_category, category.description, amountEntity, category.createdAt, category.updatedAt);

    const categoryData = await this.categoryRepositoryInterface.create(newCategory, publicId);

    return categoryData;
  }
}
