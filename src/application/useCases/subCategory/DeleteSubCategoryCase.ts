import { SubcategoryRepositoryInterface } from "src/domain/interfaces/SubcategoryRepositoryInterface";
import { AppError } from "src/utils/AppError";

class DeleteSubCategoryCase {
  constructor(private subcategoryInterface: SubcategoryRepositoryInterface) {}

  async delete(id_subcategory: number) {
    const existingSubcategory = await this.subcategoryInterface.findById(id_subcategory);
    if (!existingSubcategory) {
      throw new AppError("Subcategory not found", 404);
    }

    await this.subcategoryInterface.delete(id_subcategory);
  }
}
