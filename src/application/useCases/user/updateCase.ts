import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { Cpf } from "src/domain/entities/Cpf";
import { Email } from "src/domain/entities/Email";
import { User } from "src/domain/entities/User";
import { UserRepositoryInterface } from "src/domain/interfaces/UserRepositoryInterface";
import { UpdateUserDTO } from "src/domain/types/UpdateUserDTO";
import { EncryptionService } from "src/infrastructure/services/EncriptionService";

export class updateCase {
  constructor(private userRepository: UserRepositoryInterface, private encriptionServide: EncryptionService) {}

  async executeUpdate(publicId: string, data: UpdateUserDTO): Promise<User> {
    try {
      const existingUser = await this.userRepository.findById(publicId);

      if (!existingUser) {
        throw new Error("User not found");
      }

      const dataToUpdate: any = {};

      if (data.password !== undefined) {
        const hashedPassword = await this.encriptionServide.hashPassword(dataToUpdate.password.toString());
        dataToUpdate.password = hashedPassword;
      }

      if (data.email !== undefined) {
        const email = new Email(data.email);
        dataToUpdate.email = email.toString();
      }

      if (data.name !== undefined) {
        dataToUpdate.name = data.name;
      }

      if (data.cpf !== undefined) {
        const cpf = new Cpf(data.cpf);
        dataToUpdate.cpf = cpf.toString();
      }

      if (Object.keys(dataToUpdate).length === 0) {
        throw new Error("No data to update");
      }

      dataToUpdate.updatedAt = new Date();

      return dataToUpdate;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
