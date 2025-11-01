// src/infrastructure/controllers/UserController.ts
import { NextFunction, Request, Response } from "express";
import { CreateUserCase } from "src/application/useCases/user/CreateUserCase";
import { DeleteCases } from "src/application/useCases/user/DeleteCase";
import { FindUserUseCase } from "src/application/useCases/user/FindUserCase";
import { User } from "src/domain/entities/User";
import { AppError } from "src/shared/error/AppError";
import { updateCase } from "src/application/useCases/user/updateCase";
import { EncryptionService } from "../services/EncriptionService";

interface ITokenService {
  generateToken(payload: any): string;
}

export class UserController {
  constructor(private createUserCase: CreateUserCase, private findUser: FindUserUseCase, private updateUser: updateCase, private deleteUser: DeleteCases, private tokenService: ITokenService, private encriptionService: EncryptionService) {}

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
      const email = String(req.body.email);

      const password = String(req.body.password);

      if (!email || !password) {
        throw new AppError("Email and password are required", 400);
      }

      const user = await this.findUser.findByEmail(email);
      if (!user) {
        throw new AppError("Invalid email or password", 401);
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

      if (typeof email !== "string") throw new AppError("Email must be a string", 400);
      if (typeof password !== "string") throw new AppError("password must be a string", 400);
      if (typeof name !== "string") throw new AppError("Name must be a string", 400);

      const userData = await this.createUserCase.executeCreate(req.body);

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
        dataToUpdate.email = req.body.email;
      }

      if (name !== undefined) {
        const strName = String(name);
        dataToUpdate.name = strName;
      }

      if (cpf !== undefined) {
        dataToUpdate.cpf = req.body.cpf;
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
