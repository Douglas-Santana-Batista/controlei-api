// src/application/errors/ErrorMapper.ts
import { DomainError, ValidationError, BusinessRuleError } from "src/domain/errors/DomainErrors";
import { AppError } from "src/shared/error/AppError";

export class ErrorMapper {
  static toAppError(error: unknown): AppError {
    // Se já for AppError, retorna como está
    if (error instanceof AppError) {
      return error;
    }

    // Mapeia DomainErrors para AppErrors com status codes apropriados
    if (error instanceof ValidationError) {
      return new AppError(error.message, 400, error.code);
    }

    if (error instanceof BusinessRuleError) {
      return new AppError(error.message, 422, error.code); // Unprocessable Entity
    }

    if (error instanceof DomainError) {
      return new AppError(error.message, 400, error.code); // Fallback para outros DomainErrors
    }

    // Erro genérico
    if (error instanceof Error) {
      return new AppError(error.message, 500, "INTERNAL_ERROR");
    }

    // Erro desconhecido
    return new AppError("An unexpected error occurred", 500, "UNKNOWN_ERROR");
  }
}
