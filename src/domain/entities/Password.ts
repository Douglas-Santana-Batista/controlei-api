import { InvalidPasswordError } from "../errors/DomainErrors";

export class Password {
  private value: string;
  private isHashed: boolean;

  constructor(password: string, isHashed: boolean = false) {
    if (!isHashed) {
      this.validate(password);
    }
    this.value = password;
    this.isHashed = isHashed;
  }

  private validate(password: string): void {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("at least 8 characters");
    }

    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("at least one lowercase letter");
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("at least one uppercase letter");
    }

    if (!/(?=.*\d)/.test(password)) {
      errors.push("at least one number");
    }

    if (errors.length > 0) {
      throw new InvalidPasswordError(errors);
    }
  }

  public getValue(): string {
    return this.value;
  }

  public ishashed(): boolean {
    return this.isHashed;
  }
}
