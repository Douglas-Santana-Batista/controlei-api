import { ErrorMapper } from "src/application/errors/ErrorMapper";
import { User } from "src/domain/entities/User";
import { UserRepositoryInterface } from "src/domain/interfaces/UserRepositoryInterface";
import { UpdateUserDTO } from "src/domain/types/UpdateUserDTO";

export class updateCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async executeUpdate(publicId: string, data: UpdateUserDTO): Promise<User> {
    try {
      const dataToUpdate = await this.userRepository.update(publicId, data);

      return dataToUpdate;
    } catch (error) {
      throw ErrorMapper.toAppError(error);
    }
  }
}
