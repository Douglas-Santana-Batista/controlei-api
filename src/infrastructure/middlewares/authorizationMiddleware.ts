import { RequestHandler } from "express";
import { AppError } from "../../shared/error/AppError";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      publicId: string;
    };
  }
}

export const authorizeUser: RequestHandler = (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError("Authentication required", 401);
    }
    const authenticatedUserId = req.user.publicId;
    const targetUserId = req.params.publicId || req.query.id;

    if (!targetUserId) {
      return next();
    }

    if (authenticatedUserId !== targetUserId) {
      throw new AppError("Access denied: You can only modify your own data", 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};
