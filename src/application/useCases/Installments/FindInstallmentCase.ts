import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { InstallmentRepositoryInterface } from "src/domain/interfaces/InstallmentRepositoryInterface";
import { AppError } from "src/shared/error/AppError";

export class FindInstallment {
  constructor(private installmentInterface: InstallmentRepositoryInterface) {}

  async findInstallmentbyid(id_installment: number) {
    try {
      const installmentData = await this.installmentInterface.findById(id_installment);

      if (!installmentData) {
        throw new AppError("installment not found", 404);
      }
      return installmentData;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }

  async findAll() {
    try {
      const installments = await this.installmentInterface.findAll();
      if (installments.length === 0) {
        throw new AppError("0 installments found", 404);
      }
      return installments;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
