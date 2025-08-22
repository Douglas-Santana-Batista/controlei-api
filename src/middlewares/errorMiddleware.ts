import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";

export const errorHandler: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`[ERROR] ${err.message}`);

  let statusCode = err.statusCode || 500;
  const response: any = {
    error: err.message || "Internal server error",
    ...(err.details && { details: err.details }),
  };

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    if (err.details) {
      response.details = err.details;
    }
  }

  if (err instanceof ZodError) {
    statusCode = 400;
    response.error = "Validation error";
    response.details = err.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message || "Internal server error",
    }));
  } else if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        response.error = "Duplicate registration";
        response.details = `Unique constraint failed on field(s): ${err.meta?.target}`;
        break;

      case "P2003":
        statusCode = 400;
        response.error = "Foreign key constraint failed";
        response.details = err.meta?.field_name
          ? `Invalid foreign key on field: ${err.meta.field_name}`
          : "Invalid foreign key";
        break;

      case "P2000":
        statusCode = 400;
        response.error = "Input value is too long for the column";
        break;

      case "P2001":
        statusCode = 404;
        response.error = "Record not found with the specified filter";
        break;

      case "P2014":
        statusCode = 400;
        response.error = "Relation constraint failed";
        break;

      case "P2015":
        statusCode = 404;
        response.error = "Related record not found";
        break;

      case "P2025":
        statusCode = 404;
        response.error = "Record to update/delete does not exist";
        break;
    }
  }
  res.status(statusCode).json(response);
};
