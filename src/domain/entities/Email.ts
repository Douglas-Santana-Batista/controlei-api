export class Email {
  private email: string;

  constructor(email: string) {
    this.validate();
    this.email = email;
  }

  private validate(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new Error("Invalid email address");
    }
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(newEmail: string): string {
    this.email = newEmail;
    this.validate();
    return this.email;
  }
}
