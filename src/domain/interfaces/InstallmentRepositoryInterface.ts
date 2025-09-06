import { Installment } from "../entities/Installment";

export interface InstallmentRepositoryInterface {
  findById(id_installment: number): Promise<Installment | null>;
  findAll(): Promise<Installment[]>;
  create(installment: Installment, id_subcategory: number, id_user: number): Promise<Installment>;
  delete(id_installment: number): Promise<void>;
}
