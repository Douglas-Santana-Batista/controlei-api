import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { InstallmentRepositoryInterface } from "src/domain/interfaces/InstallmentRepositoryInterface";
import { AppError } from "src/shared/error/AppError";

export class DeleteInstallment {
  constructor(private intallmentInsterface: InstallmentRepositoryInterface) {}

  async execDelete(id_installment: number, group_public_id: string) {
    try {
      const existingInstallments = await this.intallmentInsterface.findById(id_installment);

      if (!existingInstallments) {
        throw new AppError("Installment not found", 400);
      }

      await this.intallmentInsterface.delete(group_public_id);
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
