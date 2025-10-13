import { Installment } from "../entities/Installment";

export interface InstallmentRepositoryInterface {
  findById(id_installment: number): Promise<Installment | null>;
  findAll(): Promise<Installment[]>;
  create(installment: Installment, id_subcategory: number, publicId: string): Promise<Installment[]>;
  delete(group_public_id: string): Promise<void>;
}
