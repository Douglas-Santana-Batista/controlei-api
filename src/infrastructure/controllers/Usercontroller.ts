// src/infrastructure/controllers/UserController.ts
import { Request, Response } from "express";
import { CreateUserCase } from "src/application/useCases/user/CreateUserCase";
import { Cpf } from "src/domain/entities/Cpf";
import { Email } from "src/domain/entities/Email";
import { Password } from "src/domain/entities/Password";
import { User } from "src/domain/entities/User";
import { AppError } from "src/shared/error/AppError";

export class UserController {
  constructor(private createUserCase: CreateUserCase) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          error: "Missing required fields: name, email, password",
        });
      }
      console.log("controller senha", req.body);

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
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
