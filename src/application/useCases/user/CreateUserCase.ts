import { Cpf } from "src/domain/entities/Cpf";
import { Email } from "src/domain/entities/Email";
import { Password } from "src/domain/entities/Password";
import { User } from "src/domain/entities/User";
import { UserRepositoryInterface } from "src/domain/interfaces/UserRepositoryInterface";
import { IIdProvider } from "src/domain/services/IIdProvider";
import { EncryptionService } from "src/infrastructure/services/EncriptionService";
import { AppError } from "src/utils/AppError";

export class CreateUserCase {
  constructor(private userRepository: UserRepositoryInterface, private idProvider: IIdProvider, private encriptionServide: EncryptionService) {}

  async executeCreate(publicId: string, name: string, email: string, password: string, cpf: string): Promise<User> {
    const entityPassword = new Password(password);
    const hashedPassword = await this.encriptionServide.hashPassword(entityPassword.toString());
    const entityEmail = new Email(email);
    const entityCpf = new Cpf(cpf);
    publicId = this.idProvider.generate();

    const existingUser = await this.userRepository.findByEmail(entityEmail.get());
    if (existingUser) {
      throw new AppError("User with this email already exists", 409);
    }

    const hashedPasswordEntity = new Password(hashedPassword);
    const user = new User(publicId, entityCpf, name, entityEmail, hashedPasswordEntity, new Date(), new Date());

    await this.userRepository.create(user);

    return user;
  }
}
