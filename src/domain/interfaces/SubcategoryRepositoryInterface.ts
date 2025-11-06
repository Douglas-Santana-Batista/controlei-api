import { Subcategory } from "../entities/Subcategory";

export interface SubcategoryRepositoryInterface {
  create(subcategory: Subcategory, id_category: number, publicId: string): Promise<Subcategory>;
  findById(id_subcategory: number): Promise<Subcategory | null>;
  findAll(publicId: string): Promise<Subcategory[]>;
  update(subcategory: Subcategory, id_subcategory: number): Promise<Subcategory>;
  delete(id_subcategory: number): Promise<void>;
}
