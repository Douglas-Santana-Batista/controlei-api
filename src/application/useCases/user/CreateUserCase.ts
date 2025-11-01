import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { Cpf } from "src/domain/entities/Cpf";
import { Email } from "src/domain/entities/Email";
import { Password } from "src/domain/entities/Password";
import { User } from "src/domain/entities/User";
import { UserRepositoryInterface } from "src/domain/interfaces/UserRepositoryInterface";
import { IIdProvider } from "src/domain/services/IIdProvider";
import { CreateUserDTO } from "src/domain/types/CreateUserDTO";
import { EncryptionService } from "src/infrastructure/services/EncriptionService";
import { AppError } from "src/shared/error/AppError";

export class CreateUserCase {
  constructor(private userRepository: UserRepositoryInterface, private idProvider: IIdProvider, private encriptionService: EncryptionService) {}

  async executeCreate(userData: CreateUserDTO): Promise<User> {
    try {
      const entityPassword = new Password(userData.password.toString());
      const hashedPassword = await this.encriptionService.hashPassword(entityPassword.toString());
      const entityEmail = new Email(userData.email);
      const publicId = this.idProvider.generate();
      let entityCpf: Cpf | null = null;
      if (userData.cpf) {
        entityCpf = new Cpf(userData.cpf);
      }

      const existingUser = await this.userRepository.findByEmail(entityEmail.get());

      if (existingUser) throw new AppError("User exist", 400);

      const hashedPasswordEntity = new Password(hashedPassword, true);
      const user = new User(publicId, entityCpf, userData.name, entityEmail, hashedPasswordEntity, new Date(), new Date());
      await this.userRepository.create(user);
      return user;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
