// src/infrastructure/controllers/UserController.ts
import { NextFunction, Request, Response } from "express";
import { CreateUserCase } from "src/application/useCases/user/CreateUserCase";
import { DeleteCases } from "src/application/useCases/user/DeleteCase";
import { FindUserUseCase } from "src/application/useCases/user/FindUserCase";
import { User } from "src/domain/entities/User";
import { AppError } from "src/shared/error/AppError";

export class UserController {
  constructor(private createUserCase: CreateUserCase, private findUser: FindUserUseCase, private deleteUser: DeleteCases) {}

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

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { publicId } = req.body;

      if (!publicId) {
        throw new AppError("Provide only one filter: id", 400);
      }

      if (publicId && typeof publicId !== "string") {
        throw new AppError("ID must be a string", 400);
      }

      this.deleteUser.executeDelete(publicId);

      res.json("User deleted success");
      return;
    } catch (error) {
      next(error);
    }
  }
}
