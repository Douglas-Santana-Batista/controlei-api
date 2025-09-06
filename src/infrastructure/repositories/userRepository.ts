import { PrismaClient } from "@prisma/client";
import { User } from "src/domain/entities/User";
import { UserRepositoryInterface } from "src/domain/interfaces/UserRepositoryInterface";
import { EncryptionService } from "../services/EncriptionService";
import { Email } from "src/domain/entities/Email";
import { Cpf } from "src/domain/entities/Cpf";
import { Password } from "src/domain/entities/Password";
import { UpdateUserDTO } from "src/domain/types/UpdateUserDTO";

export class UserRepository implements UserRepositoryInterface {
  private prisma: PrismaClient;
  private encriptionServide: EncryptionService;

  constructor() {
    this.prisma = new PrismaClient();
    this.encriptionServide = new EncryptionService();
  }

  async create(user: User): Promise<User> {
    const hashedPassword = await this.encriptionServide.hashPassword(user.password.toString());
    const userData = await this.prisma.user.create({
      data: {
        email: user.getEmail(),
        name: user.name,
        password: hashedPassword,
        cpf: user.getCpf(),
      },
    });
    return new User(userData.id_user, new Cpf(userData.cpf), userData.name, new Email(userData.email), new Password(userData.password), userData.updatedAt, userData.createdAt);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email: email.get() },
    });

    if (!userData) return null;
    return new User(userData.id_user, new Cpf(userData.cpf), userData.name, new Email(userData.email), new Password(userData.password), userData.updatedAt, userData.createdAt);
  }

  async findById(id_user: number): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });

    if (!userData) return null;
    return new User(userData.id_user, new Cpf(userData.cpf), userData.name, new Email(userData.email), new Password(userData.password), userData.updatedAt, userData.createdAt);
  }

  async update(id_user: number, data: UpdateUserDTO): Promise<User> {
    const dataToUpdate = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
    if (!dataToUpdate.length) {
      throw new Error("No data to update");
    }

    if (!dataToUpdate.password === undefined) {
      const hashedPassword = await this.encriptionServide.hashPassword(dataToUpdate.password.toString());
      dataToUpdate.password = hashedPassword;
    }

    const userData = await this.prisma.user.update({
      where: { id_user },
      data: {
        email: dataToUpdate.email.get(),
        name: dataToUpdate.name,
        password: dataToUpdate.password.toString(),
        cpf: dataToUpdate.cpf.get(),
        updatedAt: new Date(),
      },
    });
    return new User(userData.id_user, new Cpf(userData.cpf), userData.name, new Email(userData.email), new Password(userData.password), userData.updatedAt, userData.createdAt);
  }

  async delete(id_user: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id_user },
    });
  }
}
