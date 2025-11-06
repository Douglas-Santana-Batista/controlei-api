import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { Amount } from "src/domain/entities/Amount";
import { Subcategory } from "src/domain/entities/Subcategory";
import { SubcategoryRepositoryInterface } from "src/domain/interfaces/SubcategoryRepositoryInterface";
import { AppError } from "src/shared/error/AppError";

export class UpdateSubCategoryUseCase {
  constructor(private subcategoryInterface: SubcategoryRepositoryInterface) {}

  async executeUpdate(subcategory: Subcategory, id_subcategory: number) {
    try {
      if (subcategory.value) {
        const valueNumber = Number(subcategory.value);
        const entityValue = new Amount(valueNumber);
        subcategory.value = entityValue;
      }
      if (!id_subcategory) throw new AppError("Subcategory ID is required for update", 400);

      const existingSubcategory = await this.subcategoryInterface.findById(id_subcategory);

      if (!existingSubcategory) throw new AppError("Subcategory not found", 404);

      const updatedSubcategory = new Subcategory(
        subcategory.id_subcategory,
        subcategory.description ?? existingSubcategory.description,
        subcategory.value ?? existingSubcategory.value,
        subcategory.payment_type ?? existingSubcategory.payment_type,
        subcategory.financialFlow ?? existingSubcategory.financialFlow,
        existingSubcategory.createdAt,
        new Date()
      );

      const updatedData = await this.subcategoryInterface.update(updatedSubcategory, id_subcategory);
      return updatedData;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
