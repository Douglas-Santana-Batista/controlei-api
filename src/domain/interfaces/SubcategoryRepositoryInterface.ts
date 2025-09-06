import { Subcategory } from "../entities/Subcategory";

export interface SubcategoryRepositoryInterface {
  findById(id_user: number): Promise<Subcategory | null>;
  findAll(): Promise<Subcategory[]>;
  create(subcategory: Subcategory, id_category: number, id_user: number): Promise<Subcategory>;
  update(subcategory: Subcategory): Promise<Subcategory>;
  delete(id_subcategory: number): Promise<void>;
}
