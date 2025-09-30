import { Category } from "../entities/Category";

export interface CategoryRepositoryInterface {
  findById(id: number): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  create(category: Category, publicId: string): Promise<Category>;
  update(data: Category): Promise<Category>;
  delete(id: number): Promise<void>;
}
