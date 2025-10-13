import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { User } from "src/domain/entities/User";
import { UserRepositoryInterface } from "src/domain/interfaces/UserRepositoryInterface";

export class CreateUserCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async executeCreate(userData: User): Promise<User> {
    try {
      await this.userRepository.create(userData);
      return userData;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
