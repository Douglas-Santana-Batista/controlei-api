// src/infrastructure/controllers/UserController.ts
import { NextFunction, Request, Response } from "express";
import { CreateUserCase } from "src/application/useCases/user/CreateUserCase";

export class UserController {
  constructor(private createUserCase: CreateUserCase) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
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
      next(error);
    }
  }
}
