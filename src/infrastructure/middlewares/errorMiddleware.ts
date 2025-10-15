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

  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      error: "Invalid JSON format",
      message: "The request body contains invalid JSON syntax",
      ...(process.env.NODE_ENV === "development" && {
        details: err.message,
      }),
    });
  }

  // ✅ CORREÇÃO: Removemos a duplicação - apenas UMA verificação para AppError
  if (err instanceof AppError) {
    const response: any = {
      error: err.message,
    };

    // Inclui o code se existir
    if (err.code) {
      response.code = err.code;
    }

    // Em desenvolvimento, inclui stack trace
    if (process.env.NODE_ENV === "development") {
      response.stack = err.stack;
    }

    return res.status(err.statusCode).json(response);
  }

  let statusCode = 500;
  let errorMessage = "Internal server error";
  let details: any = null;

  // ✅ AGORA APENAS OUTROS TIPOS DE ERRO (AppError já foi tratado acima)

  // Tratamento para erros de validação (Zod)
  if (err instanceof ZodError) {
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
  // Tratamento para outros tipos de erro (Error genérico)
  else if (err instanceof Error) {
    // ✅ CORREÇÃO: Para erros genéricos, use a mensagem real
    errorMessage = err.message;

    // Em desenvolvimento, mostre mais detalhes
    if (process.env.NODE_ENV === "development") {
      details = { stack: err.stack };
    }
  }

  // ✅ FINALMENTE, envie a resposta
  const responseBody: any = {
    error: errorMessage,
    ...(details && { details }),
  };

  // ✅ CORREÇÃO: Adicione informações úteis para identificar o erro
  if (process.env.NODE_ENV === "development") {
    responseBody.timestamp = new Date().toISOString();
    responseBody.path = req.path;
  }

  res.status(statusCode).json(responseBody);
};

// Função auxiliar para tratar erros do Prisma (mantenha igual)
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

// Função para log de erros (mantenha igual)
function logError(err: Error, req: Request) {
  const logData: any = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    message: err.message,
  };

  if (process.env.NODE_ENV === "development") {
    logData.stack = err.stack;
    logData.body = sanitizeData(req.body);

    if (req.user) {
      logData.user = sanitizeData(req.user);
    }
  }

  console.error(logData);
}
