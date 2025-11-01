import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { Subcategory } from "src/domain/entities/Subcategory";
import { SubcategoryRepositoryInterface } from "src/domain/interfaces/SubcategoryRepositoryInterface";
import { AppError } from "src/shared/error/AppError";

export class UpdateSubCategoryUseCase {
  constructor(private subcategoryInterface: SubcategoryRepositoryInterface) {}

  async executeUpdate(subcategory: Subcategory) {
    try {
      if (!subcategory.id_subcategory) {
        throw new AppError("Subcategory ID is required for update", 400);
      }

      const existingSubcategory = await this.subcategoryInterface.findById(subcategory.id_subcategory);
      if (!existingSubcategory) {
        throw new AppError("Subcategory not found", 404);
      }

      const updatedSubcategory = new Subcategory(
        subcategory.id_subcategory,
        subcategory.description ?? existingSubcategory.description,
        subcategory.value ?? existingSubcategory.value,
        subcategory.paymentType ?? existingSubcategory.paymentType,
        subcategory.financialFlow ?? existingSubcategory.financialFlow,
        existingSubcategory.createdAt,
        new Date()
      );

      const updatedData = await this.subcategoryInterface.update(updatedSubcategory);
      return updatedData;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
