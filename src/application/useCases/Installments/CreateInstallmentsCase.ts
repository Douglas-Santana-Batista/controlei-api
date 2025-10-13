import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { Installment } from "src/domain/entities/Installment";
import { InstallmentRepositoryInterface } from "src/domain/interfaces/InstallmentRepositoryInterface";

export class CreateInstallmentCase {
  constructor(private installmentInterface: InstallmentRepositoryInterface) {}

  async execCreateInstallment(installment: Installment, id_subcategory: number, publicId: string): Promise<Installment[]> {
    try {
      const installmentCreated = await this.installmentInterface.create(installment, id_subcategory, publicId);
      return installmentCreated;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
