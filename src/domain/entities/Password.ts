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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error("Password does not meet requirements");
    }
  }

  public toString(): string {
    return this.value;
  }

  public ishashed(): boolean {
    return this.isHashed;
  }
}
