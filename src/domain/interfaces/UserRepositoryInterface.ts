import { User } from "../entities/User";
import { UpdateUserDTO } from "../types/UpdateUserDTO";

export interface UserRepositoryInterface {
  findByEmail(email: string): Promise<User | null>;
  findById(publicId: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(publicId: string, data: UpdateUserDTO): Promise<User>;
  delete(publicId: string): Promise<void>;
}
