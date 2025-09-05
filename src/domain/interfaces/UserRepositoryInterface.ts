import { Email } from "../entities/Email";
import { User } from "../entities/User";
import { UpdateUserDTO } from "../types/UpdateUserDTO";

export interface UserRepositoryInterface {
  findByEmail(email: Email): Promise<User | null>;
  findById(id_user: number): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id_user: number, data: UpdateUserDTO): Promise<User>;
  delete(id_user: number): Promise<void>;
}
