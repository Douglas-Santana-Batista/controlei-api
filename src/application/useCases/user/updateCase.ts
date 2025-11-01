import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { Cpf } from "src/domain/entities/Cpf";
import { Email } from "src/domain/entities/Email";
import { Password } from "src/domain/entities/Password";
import { User } from "src/domain/entities/User";
import { UserRepositoryInterface } from "src/domain/interfaces/UserRepositoryInterface";
import { UpdateUserDTO } from "src/domain/types/UpdateUserDTO";
import { EncryptionService } from "src/infrastructure/services/EncriptionService";
import { AppError } from "src/shared/error/AppError";

export class updateCase {
  constructor(private userRepository: UserRepositoryInterface, private encryptionService: EncryptionService) {}

  async executeUpdate(publicId: string, data: UpdateUserDTO): Promise<User> {
    try {
      const existingUser = await this.userRepository.findById(publicId);
      if (!existingUser) {
        throw new AppError("User not found", 404);
      }

      const dataUpdate: Partial<{ email: string; cpf: string; password: string; name: string }> = {};

      if (data.name) {
        dataUpdate.name = data.name;
      }

      if (data.email) {
        const currentEmail = existingUser.email.get();
        if (data.email !== currentEmail) {
          const emailEntity = new Email(data.email);
          const emailValue = emailEntity.get();

          const existingUserWithEmail = await this.userRepository.findByEmail(emailValue);
          if (existingUserWithEmail && existingUserWithEmail.publicId !== publicId) {
            throw new AppError("Email is already in use", 400);
          }

          dataUpdate.email = emailValue;
        }
      }

      if (data.cpf) {
        const currentCpf = existingUser.cpf ? existingUser.cpf.get() : null;
        if (!currentCpf || data.cpf !== currentCpf) {
          const cpfEntity = new Cpf(data.cpf);
          const cpfValue = cpfEntity.get();

          const userWithSameCpf = await this.userRepository.findByCpf(cpfValue);
          if (userWithSameCpf && userWithSameCpf.publicId !== publicId) {
            throw new AppError("CPF is already in use by another user", 400);
          }

          dataUpdate.cpf = cpfValue;
        }
      }

      if (data.password && data.password.trim() !== "") {
        try {
          const passwordEntity = new Password(data.password);

          const isSamePassword = await this.encryptionService.comparePassword(data.password, existingUser.password.toString());

          if (!isSamePassword) {
            const hashedPassword = await this.encryptionService.hashPassword(data.password);
            dataUpdate.password = hashedPassword;
          }
        } catch (error) {
          throw new AppError("Invalid password", 400);
        }
      }
      if (Object.keys(dataUpdate).length === 0) {
        return existingUser;
      }

      const updatedUser = await this.userRepository.update(publicId, dataUpdate);
      return updatedUser;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
