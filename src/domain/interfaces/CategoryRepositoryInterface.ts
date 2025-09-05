import { Category } from "../entities/Category";

export interface CategoryRepositoryInterface {
  findById(id: number): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  create(category: Category, id_user: number): Promise<Category>;
  update(id: number, id_user: number, data: Category): Promise<Category>;
  delete(id: number): Promise<void>;
}
