export class Password {
  private password: string;

  constructor(password: string) {
    this.validate(password);
    this.password = password;
  }

  private validate(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  public setPassword(newPassword: string) {
    this.password = newPassword;
    return this.password;
  }

  public toString(): string {
    return this.password;
  }
}
