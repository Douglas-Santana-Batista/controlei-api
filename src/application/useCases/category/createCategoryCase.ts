import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { Amount } from "src/domain/entities/Amount";
import { Category } from "src/domain/entities/Category";
import { CategoryRepositoryInterface } from "src/domain/interfaces/CategoryRepositoryInterface";
import { CreateCategoryDTO } from "src/domain/types/CreateCategoryDTO,";
import { FindUserUseCase } from "../user/FindUserCase";
import { AppError } from "src/shared/error/AppError";

export class CreateCategoryCase {
  constructor(private categoryRepositoryInterface: CategoryRepositoryInterface, private findUser: FindUserUseCase) {}

  async executeCreate(category: CreateCategoryDTO, publicId: string): Promise<Category> {
    try {
      const entityAmount = new Amount(category.budget);

      const newCategory = new Category(0, category.description, entityAmount, new Date(), new Date());
      const categoryData = await this.categoryRepositoryInterface.create(newCategory, publicId);
      return categoryData;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
