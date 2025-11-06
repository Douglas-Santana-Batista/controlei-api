import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { Amount } from "src/domain/entities/Amount";
import { Subcategory } from "src/domain/entities/Subcategory";
import { SubcategoryRepositoryInterface } from "src/domain/interfaces/SubcategoryRepositoryInterface";

export class CreateSubCategoryCase {
  constructor(private subCategoryRepository: SubcategoryRepositoryInterface) {}

  async executeCreate(subcategory: Subcategory, id_category: number, publicId: string) {
    try {
      const numericValue = Number(subcategory.value);
      const valueEntity = new Amount(numericValue);

      const subCategoryEntity = new Subcategory(subcategory.id_subcategory, subcategory.description, valueEntity, subcategory.payment_type, subcategory.financialFlow, subcategory.createdAt, subcategory.updatedAt);

      const subCategoryData = await this.subCategoryRepository.create(subCategoryEntity, id_category, publicId);

      return subCategoryData;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
