import { UserRepositoryInterface } from "src/domain/interfaces/UserRepositoryInterface";

export class DeleteCases {
  constructor(private userRepositoryInterface: UserRepositoryInterface) {}

  async executeDelete(publicId: string) {
    await this.userRepositoryInterface.delete(publicId);
  }
}
