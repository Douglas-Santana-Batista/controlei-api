import { SubcategoryRepositoryInterface } from "src/domain/interfaces/SubcategoryRepositoryInterface";

class FindSubCategoryCase {
  constructor(private subcategoryRepositoryInterface: SubcategoryRepositoryInterface) {}

  async findById(id_subcategory: number) {
    const subCategoryData = await this.subcategoryRepositoryInterface.findById(id_subcategory);
    return subCategoryData;
  }

  async findAll(publicId: string) {
    const subcategoryAllData = await this.subcategoryRepositoryInterface.findAll(publicId);
    return subcategoryAllData;
  }
}
