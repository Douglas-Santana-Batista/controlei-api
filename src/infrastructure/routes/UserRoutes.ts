import { Router } from "express";
import { EncryptionService } from "src/infrastructure/services/EncriptionService";
import { UserController } from "../controllers/Usercontroller";
import { CreateUserCase } from "src/application/useCases/user/CreateUserCase";
import { UuidIdProvider } from "../services/UuidIdProvider";
import { FindUserUseCase } from "src/application/useCases/user/FindUserCase";
import { DeleteCases } from "src/application/useCases/user/DeleteCase";
import { TokenService } from "../services/Tokenservice";
import { authorizeUser } from "../middlewares/authorizationMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import prisma from "../database/prisma";
import { UserRepositoryInterface } from "src/domain/interfaces/UserRepositoryInterface";
import { UserRepository } from "../repositories/UserRepository";
import { updateCase } from "src/application/useCases/user/updateCase";

export const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

const tokenService = new TokenService(JWT_SECRET);

const userRepository: UserRepositoryInterface = new UserRepository(prisma);
const encryptionService = new EncryptionService();
const id = new UuidIdProvider();

const deleteUser = new DeleteCases(userRepository);
const findUser = new FindUserUseCase(userRepository);
const updateUser = new updateCase(userRepository, encryptionService);
const createUserCase = new CreateUserCase(userRepository, id, encryptionService);
const userController = new UserController(createUserCase, findUser, updateUser, deleteUser, tokenService, encryptionService);

router.post("/login", userController.login.bind(userController));
router.post("/register", userController.create.bind(userController));
router.get("/find", authMiddleware, authorizeUser, userController.find.bind(userController));
router.delete("/deleteUser/:publicId", authMiddleware, authorizeUser, userController.delete.bind(userController));
router.put("/updateUser/:publicId", authMiddleware, authorizeUser, userController.update.bind(userController));
