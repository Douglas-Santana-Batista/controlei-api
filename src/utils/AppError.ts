// src/utils/AppErrors/AppError.ts
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly details?: any;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true; // Marca como erro operacional (não de programação)
    Object.setPrototypeOf(this, new.target.prototype);
  }

  // Métodos estáticos para erros comuns (fábricas)
  static badRequest(message: string, details?: any) {
    return new AppError(message, 400, details);
  }

  static unauthorized(message: string = "Unauthorized") {
    return new AppError(message, 401);
  }

  static forbidden(message: string = "Forbidden") {
    return new AppError(message, 403);
  }

  static notFound(message: string = "Not found") {
    return new AppError(message, 404);
  }

  static conflict(message: string, details?: any) {
    return new AppError(message, 409, details);
  }

  static internalError(message: string = "Internal server error") {
    return new AppError(message, 500);
  }

  static validationError(message: string = "Validation error", details?: any) {
    return new AppError(message, 422, details);
  }
}
