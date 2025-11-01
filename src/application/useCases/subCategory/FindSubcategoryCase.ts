import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { SubcategoryRepositoryInterface } from "src/domain/interfaces/SubcategoryRepositoryInterface";

export class FindSubCategoryCase {
  constructor(private subcategoryRepositoryInterface: SubcategoryRepositoryInterface) {}

  async findById(id_subcategory: number) {
    try {
      const subCategoryData = await this.subcategoryRepositoryInterface.findById(id_subcategory);
      return subCategoryData;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }

  async findAll(publicId: string) {
    try {
      const subcategoryAllData = await this.subcategoryRepositoryInterface.findAll(publicId);
      return subcategoryAllData;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
