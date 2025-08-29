import { Subcategory } from "../entities/Subcategory";

export interface SubcategoryRepositoryInterface {
  findById(id: number): Promise<Subcategory | null>;
  findAll(): Promise<Subcategory[]>;
  save(subcategory: Subcategory): Promise<void>;
  update(subcategory: Subcategory): Promise<void>;
  delete(id: number): Promise<void>;
}
