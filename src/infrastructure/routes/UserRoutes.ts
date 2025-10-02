// src/infrastructure/routes/userRoutes.ts
import { Router } from "express";
import { UserRepository } from "src/infrastructure/repositories/UserRepository";
import { EncryptionService } from "src/infrastructure/services/EncriptionService";
import { UserController } from "../controllers/Usercontroller";
import { CreateUserCase } from "src/application/useCases/user/CreateUserCase";
import prisma from "../database/prisma";
import { UuidIdProvider } from "../services/UuidIdProvider";

export const router = Router();

const userRepository = new UserRepository(prisma);
const encryptionService = new EncryptionService();
const id = new UuidIdProvider();

const createUserCase = new CreateUserCase(userRepository, id, encryptionService);
const userController = new UserController(createUserCase);

// Rotas
router.post("/register", (req, res, next) => userController.create(req, res, next));
