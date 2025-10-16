import { RequestHandler } from "express";
import { AppError } from "../../shared/error/AppError";
import { verifyToken } from "../../shared/utils/authUtils";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization?.split(" ")[1];
    if (!authorization) {
      throw new AppError("invalid token");
    }
    const decoded = verifyToken(authorization) as { publicId: string };
    req.user = { publicId: decoded.publicId };
    next();
  } catch (error) {
    next(error);
  }
};
