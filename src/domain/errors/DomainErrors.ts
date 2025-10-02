export type ErrorCode = "VALIDATION_ERROR" | "INVALID_EMAIL" | "INVALID_PASSWORD" | "INVALID_AMOUNT" | "BUSINESS_RULE_ERROR" | "INSUFFICIENT_FUNDS" | "DUPLICATE_EMAIL";

// Erros base
export abstract class DomainError extends Error {
  abstract readonly code: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

// src/domain/errors/ValidationErrors.ts
// Erros de validação
export class ValidationError extends DomainError {
  readonly code: ErrorCode = "VALIDATION_ERROR";
}

export class InvalidEmailError extends ValidationError {
  readonly code: ErrorCode = "INVALID_EMAIL";
  constructor(email: string) {
    super(`Invalid email format: ${email}`);
  }
}

export class InvalidPasswordError extends ValidationError {
  readonly code: ErrorCode = "INVALID_PASSWORD";
  constructor(requirements: string[]) {
    super(`Password does not meet requirements: ${requirements.join(", ")}`);
  }
}

export class InvalidAmountError extends ValidationError {
  readonly code: ErrorCode = "INVALID_AMOUNT";
  constructor(message: string) {
    super(message);
  }
}

// src/domain/errors/BusinessErrors.ts
// Erros de regra de negócio
export class BusinessRuleError extends DomainError {
  readonly code: ErrorCode = "BUSINESS_RULE_ERROR";
}

export class InsufficientFundsError extends BusinessRuleError {
  readonly code: ErrorCode = "INSUFFICIENT_FUNDS";
  constructor(amount: number, balance: number) {
    super(`Insufficient funds. Required: ${amount}, Available: ${balance}`);
  }
}

export class DuplicateEmailError extends BusinessRuleError {
  readonly code: ErrorCode = "DUPLICATE_EMAIL";
  constructor(email: string) {
    super(`Email already exists: ${email}`);
  }
}
