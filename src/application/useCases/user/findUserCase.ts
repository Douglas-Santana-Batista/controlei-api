import { Email } from "src/domain/entities/Email";
import { User } from "src/domain/entities/User";
import { UserRepositoryInterface } from "src/domain/interfaces/UserRepositoryInterface";
import { AppError } from "src/shared/error/AppError";

export class FindUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async findByEmail(email: string): Promise<User> {
    const entityEmail = new Email(email);
    const user = await this.userRepository.findByEmail(entityEmail.get());
    if (!user) {
      throw new AppError("User does not exist", 404);
    }
    return user;
  }

  async findByPublicId(publicId: string): Promise<User> {
    const user = await this.userRepository.findById(publicId);
    if (!user) {
      throw new AppError("User does not exist", 404);
    }
    return user;
  }
}
