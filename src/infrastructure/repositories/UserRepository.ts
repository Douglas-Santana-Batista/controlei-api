import { PrismaClient } from "@prisma/client";
import { UserRepositoryInterface } from "src/domain/interfaces/UserRepositoryInterface";
import { Email } from "src/domain/entities/Email";
import { Cpf } from "src/domain/entities/Cpf";
import { Password } from "src/domain/entities/Password";
import { UpdateUserDTO } from "src/domain/types/UpdateUserDTO";
import { User } from "src/domain/entities/User";

export class UserRepository implements UserRepositoryInterface {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(user: User): Promise<User> {
    const userData = await this.prisma.user.create({
      data: {
        publicId: user.publicId,
        email: user.getEmail(),
        name: user.name,
        password: user.getPassword(),
        cpf: user.getCpf(),
      },
    });
    return new User(userData.publicId, userData.cpf ? new Cpf(userData.cpf) : null, userData.name, new Email(userData.email), new Password(userData.password, true), userData.updatedAt, userData.createdAt);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userData) return null;

    return new User(userData.publicId, userData.cpf ? new Cpf(userData.cpf) : null, userData.name, new Email(userData.email), new Password(userData.password, true), userData.updatedAt, userData.createdAt);
  }

  async findById(publicId: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { publicId },
    });

    if (!userData) return null;
    return new User(userData.publicId, userData.cpf ? new Cpf(userData.cpf) : null, userData.name, new Email(userData.email), new Password(userData.password, true), userData.updatedAt, userData.createdAt);
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { cpf },
    });

    if (!userData) return null;
    return new User(userData.publicId, userData.cpf ? new Cpf(userData.cpf) : null, userData.name, new Email(userData.email), new Password(userData.password, true), userData.updatedAt, userData.createdAt);
  }

  async update(publicId: string, dataToUpdate: UpdateUserDTO): Promise<User> {
    const userData = await this.prisma.user.update({
      where: { publicId },
      data: {
        ...(dataToUpdate.email !== undefined && { email: dataToUpdate.email }),
        ...(dataToUpdate.name !== undefined && { name: dataToUpdate.name }),
        ...(dataToUpdate.password !== undefined && { password: dataToUpdate.password }),
        ...(dataToUpdate.cpf !== undefined && { cpf: dataToUpdate.cpf }),
        updatedAt: new Date(),
      },
    });

    return new User(userData.publicId, userData.cpf ? new Cpf(userData.cpf) : null, userData.name, new Email(userData.email), new Password(userData.password, true), userData.updatedAt, userData.createdAt);
  }

  async delete(publicId: string): Promise<void> {
    await this.prisma.user.delete({
      where: { publicId },
    });
  }
}
