import { Category } from "../entities/Category";
import { PaginationParams, PaginationResult } from "../types/PaginationTypes";

export interface CategoryRepositoryInterface {
  findById(id: number): Promise<Category | null>;
  findAll(publicId: string): Promise<Category[]>;
  findAllPaginated(params: PaginationParams): Promise<PaginationResult<Category>>;
  create(category: Category, publicId: string): Promise<Category>;
  update(data: Category, id_category: number, publicId: string): Promise<Category>;
  delete(id: number): Promise<void>;
}
