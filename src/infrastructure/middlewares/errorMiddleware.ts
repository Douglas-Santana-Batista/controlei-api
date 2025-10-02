import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";
import { AppError } from "../../shared/error/AppError";

// Função para filtrar dados sensíveis
function sanitizeData(data: any): any {
  if (!data || typeof data !== "object") return data;

  const sensitiveFields = ["password", "token", "creditCard", "cvv", "cpf"];
  const sanitized = { ...data };

  sensitiveFields.forEach((field) => {
    if (sanitized[field]) {
      sanitized[field] = "***REDACTED***";
    }
  });

  return sanitized;
}

export const errorHandler: ErrorRequestHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
  logError(err, req);

  let statusCode = 500;
  let errorMessage = "Internal server error";
  let details: any = null;

  // Tratamento para AppError (erros de negócio)
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorMessage = err.message;
    details = err.details;
  }
  // Tratamento para erros de validação (Zod)
  else if (err instanceof ZodError) {
    statusCode = 400;
    errorMessage = "Validation error";
    details = err.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));
  }
  // Tratamento para erros do Prisma
  else if (err instanceof PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(err);
    statusCode = prismaError.statusCode;
    errorMessage = prismaError.message;
    details = prismaError.details;
  }
  // Tratamento para outros tipos de erro
  else {
    // Em desenvolvimento, mostre mais detalhes
    if (process.env.NODE_ENV === "development") {
      details = { stack: err.stack };
    }
  }

  // Finalmente, envie a resposta
  res.status(statusCode).json({
    error: errorMessage,
    ...(details && { details }),
  });
};

// Função auxiliar para tratar erros do Prisma
function handlePrismaError(err: PrismaClientKnownRequestError): {
  statusCode: number;
  message: string;
  details?: any;
} {
  switch (err.code) {
    case "P2002":
      return {
        statusCode: 409,
        message: "Duplicate registration",
        details: `Unique constraint failed on field(s): ${err.meta?.target}`,
      };

    case "P2003":
      return {
        statusCode: 400,
        message: "Foreign key constraint failed",
        details: err.meta?.field_name ? `Invalid foreign key on field: ${err.meta.field_name}` : "Invalid foreign key",
      };

    case "P2000":
      return {
        statusCode: 400,
        message: "Input value is too long for the column",
      };

    case "P2001":
      return {
        statusCode: 404,
        message: "Record not found with the specified filter",
      };

    case "P2014":
      return {
        statusCode: 400,
        message: "Relation constraint failed",
      };

    case "P2015":
      return {
        statusCode: 404,
        message: "Related record not found",
      };

    case "P2025":
      return {
        statusCode: 404,
        message: "Record to update/delete does not exist",
      };

    default:
      return {
        statusCode: 500,
        message: "Database error occurred",
        details: process.env.NODE_ENV === "development" ? err.message : undefined,
      };
  }
}

// Função para log de erros
function logError(err: Error, req: Request) {
  // Em produção, evite logar informações sensíveis
  const logData: any = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    message: err.message,
  };

  // Apenas em desenvolvimento, adicione mais detalhes
  if (process.env.NODE_ENV === "development") {
    logData.stack = err.stack;
    logData.body = sanitizeData(req.body); // Usando a função sanitizeData aqui

    // Cuidado com dados sensíveis - você pode querer filtrar
    if (req.user) {
      logData.user = sanitizeData(req.user);
    }
  }

  console.error(logData);
}
