import { CategoryRepositoryInterface } from "src/domain/interfaces/CategoryRepositoryInterface";
import { AppError } from "src/utils/AppError";

export class DeleteCategoryCases {
  constructor(private categoryRepositoryInterface: CategoryRepositoryInterface) {}

  async executeDelete(id_category: number): Promise<void> {
    const existing = await this.categoryRepositoryInterface.findById(id_category);

    if (!existing) {
      throw new AppError("Category not found", 404);
    }
    await this.categoryRepositoryInterface.delete(id_category);
  }
}
