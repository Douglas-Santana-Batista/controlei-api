import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { UserRepositoryInterface } from "src/domain/interfaces/UserRepositoryInterface";

export class DeleteCases {
  constructor(private userRepositoryInterface: UserRepositoryInterface) {}

  async executeDelete(publicId: string) {
    try {
      await this.userRepositoryInterface.delete(publicId);
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
