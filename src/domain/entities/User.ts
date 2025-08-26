export class User {
  public readonly id_user: number;
  public name: string;
  public email: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(id_user: number, name: string, email: string, password: string, createdAt: Date, updatedAt: Date) {
    this.id_user = id_user;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.validate();
  }

  private validate(): void {
    if (this.name.length < 3) {
      throw new Error("Name must be at least 3 characters long");
    }

    if (!this.isValidEmail(this.email)) {
      throw new Error("Invalid email address");
    }

    if (!this.isvalidPassword(this.password)) {
      throw new Error("Password invalid");
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public changeName(newName: string): void {
    this.name = newName;
    this.validate();
    this.updatedAt = new Date();
  }

  public changeEmail(newEmail: string): void {
    this.email = newEmail;
    this.validate();
    this.updatedAt = new Date();
  }

  public isvalidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
}
