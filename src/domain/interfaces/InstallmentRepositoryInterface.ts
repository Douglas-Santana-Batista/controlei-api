import { Installment } from "../entities/Installment";

export interface SubcategoryRepositoryInterface {
  findById(id: number): Promise<Installment | null>;
  findAll(): Promise<Installment[]>;
  save(subcategory: Installment): Promise<void>;
  delete(id: number): Promise<void>;
}
