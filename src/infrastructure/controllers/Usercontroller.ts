// src/infrastructure/controllers/UserController.ts
import { NextFunction, Request, Response } from "express";
import { CreateUserCase } from "src/application/useCases/user/CreateUserCase";
import { DeleteCases } from "src/application/useCases/user/DeleteCase";
import { FindUserUseCase } from "src/application/useCases/user/FindUserCase";
import { Email } from "src/domain/entities/Email";
import { Password } from "src/domain/entities/Password";
import { IIdProvider } from "src/domain/services/IIdProvider";
import { User } from "src/domain/entities/User";
import { AppError } from "src/shared/error/AppError";
import { EncryptionService } from "../services/EncriptionService";
import { Cpf } from "src/domain/entities/Cpf";
import { updateCase } from "src/application/useCases/user/updateCase";

interface ITokenService {
  generateToken(payload: any): string;
}

export class UserController {
  constructor(
    private createUserCase: CreateUserCase,
    private findUser: FindUserUseCase,
    private updateUser: updateCase,
    private deleteUser: DeleteCases,
    private idProvider: IIdProvider,
    private encriptionService: EncryptionService,
    private tokenService: ITokenService
  ) {}

  private toUserResponse(user: User | null) {
    if (!user) return null;

    return {
      publicId: user.publicId,
      name: user.name,
      email: user.email.get(),
      cpf: user.getCpf(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError("Email and password are required", 400);
      }

      const user = await this.findUser.findByEmail(email.toString());
      if (!user) {
        throw new AppError("Invalid credentials", 401);
      }

      const isPasswordValid = await this.encriptionService.comparePassword(password.toString(), user.password.toString());

      if (!isPasswordValid) {
        throw new AppError("Invalid credentials", 401);
      }

      const token = this.tokenService.generateToken({
        publicId: user.publicId,
        email: user.email.get(),
      });

      return res.status(200).json({
        message: "Login successful",
        token,
        user: this.toUserResponse(user),
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        const missingFields = [];
        if (!name) missingFields.push("name");
        if (!email) missingFields.push("email");
        if (!password) missingFields.push("password");

        throw new AppError(`Missing required fields: ${missingFields.join(", ")}`, 400);
      }
      const entityPassword = new Password(password.toString());
      const hashedPassword = await this.encriptionService.hashPassword(entityPassword.toString());
      const entityEmail = new Email(email.toString());
      const publicId = this.idProvider.generate();
      let entityCpf: Cpf | null = null;
      if (req.body.cpf) {
        entityCpf = new Cpf(req.body.cpf);
      }

      const hashedPasswordEntity = new Password(hashedPassword, true);
      const user = new User(publicId, entityCpf, name, entityEmail, hashedPasswordEntity, new Date(), new Date());

      const userData = await this.createUserCase.executeCreate(user);

      const userResponse = this.toUserResponse(userData);

      return res.status(201).json({
        message: "User created successfully",
        user: userResponse,
      });
    } catch (error) {
      next(error);
    }
  }

  async find(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, id } = req.query;

      if (email && id) {
        throw new AppError("Provide only one filter: email OR id", 400);
      }

      if (email && typeof email !== "string") {
        throw new AppError("Email must be a string", 400);
      }

      if (id && typeof id !== "string") {
        throw new AppError("ID must be a string", 400);
      }

      if (email) {
        const user = await this.findUser.findByEmail(email);
        if (!user) {
          throw new AppError("User not found", 404);
        }
        res.json({ user: this.toUserResponse(user) });
        return;
      }

      if (id) {
        const user = await this.findUser.findByPublicId(id);
        if (!user) {
          throw new AppError("User not found", 404);
        }
        res.json({ user: this.toUserResponse(user) });
        return;
      }

      throw new AppError("Provide email or id as query parameter", 400);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<User | void> {
    try {
      const { publicId } = req.params;
      const { name, email, password, cpf } = req.body;

      const existingUser = await this.findUser.findByPublicId(publicId);

      if (!existingUser) {
        throw new Error("User not found");
      }

      const dataToUpdate: any = {};

      if (password !== undefined) {
        const strPassword = String(password);
        const hashedPassword = await this.encriptionService.hashPassword(strPassword);
        dataToUpdate.password = hashedPassword;
      }

      if (email !== undefined) {
        const strEmail = String(email);
        const emailEntity = new Email(strEmail);
        dataToUpdate.email = emailEntity.get();
      }

      if (name !== undefined) {
        const strName = String(name);
        dataToUpdate.name = strName;
      }

      if (cpf !== undefined) {
        const strCpf = String(cpf);
        const cpfEntity = new Cpf(strCpf);
        dataToUpdate.cpf = cpf.toString();
      }

      if (Object.keys(dataToUpdate).length === 0) {
        throw new Error("No data to update");
      }

      dataToUpdate.updatedAt = new Date();

      const userUpdated = await this.updateUser.executeUpdate(publicId, dataToUpdate);

      res.status(200).json({ message: "User updated succefuly", userUpdated });
      return;
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { publicId } = req.params;
      console.log(publicId);

      if (!publicId) {
        throw new AppError("Provide only one filter: id", 400);
      }

      if (publicId && typeof publicId !== "string") {
        throw new AppError("ID must be a string", 400);
      }

      const existingUser = await this.findUser.findByPublicId(publicId);

      if (!existingUser) {
        throw new AppError("User not found", 404, "USER_NOT_FOUND");
      }

      this.deleteUser.executeDelete(publicId);

      res.status(200).json("User deleted success");
      return;
    } catch (error) {
      next(error);
    }
  }
}
