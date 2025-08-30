export class Email {
  private email: string;

  constructor(email: string) {
    this.validate();
    this.email = email;
  }

  private validate(): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new Error("Invalid email address");
    }
    return this.email;
  }

  public get(): string {
    return this.email;
  }

  public setEmail(newEmail: string): string {
    this.email = newEmail;
    this.validate();
    return this.email;
  }
}
