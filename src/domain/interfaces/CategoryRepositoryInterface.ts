import { Category } from "../entities/Category";

export interface CategoryRepositoryInterface {
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  create(user: Category): Promise<Category>;
  update(id: string, data: Category): Promise<Category>;
  delete(id: string): Promise<void>;
}
