// src/infrastructure/controllers/UserController.ts
import { NextFunction, Request, Response } from "express";
import { CreateUserCase } from "src/application/useCases/user/CreateUserCase";
import { FindUserUseCase } from "src/application/useCases/user/FindUserCase";
import { User } from "src/domain/entities/User";
import { AppError } from "src/shared/error/AppError";

export class UserController {
  constructor(private createUserCase: CreateUserCase, private findUser: FindUserUseCase) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          error: "Missing required fields: name, email, password",
        });
      }

      const userData = await this.createUserCase.executeCreate(req.body);

      const userResponse = {
        publicId: userData.publicId,
        name: userData.name,
        email: userData.email,
        cpf: userData.cpf,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      };

      return res.status(201).json({
        message: "User created successfully",
        user: userResponse,
      });
    } catch (error) {
      next(error);
    }
  }

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

  async find(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, id } = req.query;

      if (email && id) {
        throw new AppError("Provide only one filter: email OR id", 400);
      }

      if (email) {
        const user = await this.findUser.findByEmail(email as string);
        if (!user) {
          throw new AppError("User not found", 404);
        }
        res.json({ user: this.toUserResponse(user) });
        return;
      }

      if (id) {
        const user = await this.findUser.findByPublicId(id as string);
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
}
