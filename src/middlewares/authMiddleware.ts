import { RequestHandler } from "express";
import { AppError } from "../utils/AppError";
import { verifyToken } from "../utils/authUtils";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id_user: number;
    };
  }
}

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const autorization = req.headers.authorization?.split(" ")[1];
    if (!autorization) {
      throw new AppError("invalid token");
    }
    const decoded = verifyToken(autorization) as { id_user: number };
    req.user = { id_user: decoded.id_user };
    next();
  } catch (error) {
    next(error);
  }
};
