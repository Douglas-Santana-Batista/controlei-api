import { NextFunction, RequestHandler } from "express";
import { AppError } from "../utils/AppError";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id_user: number;
    };
  }
}


export const authorizeUser:RequestHandler = (req, res, next) => {
  try {

    if (!req.user) {
      throw new AppError("Authentication required", 401);
    }

    const authenticatedUserId = Number(req.user.id_user);
    const targetUserId = Number(req.params.id_user);

    if (authenticatedUserId !== targetUserId) {
      throw new AppError("Access denied: You can only modify your own data",403)
    }

    next()
  } catch (error) {
    next(error)
  }
};