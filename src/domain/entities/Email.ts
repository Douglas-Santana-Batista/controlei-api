export class Email {
  private email: string;

  constructor(email: string) {
    this.validate(email);
    this.email = email;
  }

  private validate(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address");
    }
  }

  public get(): string {
    return this.email;
  }

  public setEmail(newEmail: string): string {
    this.email = newEmail;
    this.validate(newEmail);
    return this.email;
  }
}
