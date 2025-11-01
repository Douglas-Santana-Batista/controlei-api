import { Cpf } from "./Cpf";
import { Email } from "./Email";
import { Password } from "./Password";

export class User {
  public readonly id_user?: number;
  public publicId: string;
  public cpf: Cpf | null;
  public name: string;
  public email: Email;
  public password: Password;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(publicId: string, cpf: Cpf | null, name: string, email: Email, password: Password, createdAt: Date, updatedAt: Date, id_user?: number) {
    this.publicId = publicId;
    this.cpf = cpf;
    this.name = this.normalizeName(name);
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id_user = id_user;
  }

  public changeName(newName: string): void {
    this.name = newName;
    this.updatedAt = new Date();
  }

  public changeEmail(newEmail: string): string {
    this.updatedAt = new Date();
    return this.email.setEmail(newEmail);
  }

  public getEmail(): string {
    return this.email.get();
  }

  public getPassword(): string {
    return this.password.getValue();
  }

  public changeCpf(newCpf: string): string | null {
    this.updatedAt = new Date();
    if (!this.cpf) {
      return null;
    }
    return this.cpf.set(newCpf);
  }

  public getCpf(): string | null {
    if (!this.cpf) {
      return null;
    }
    return this.cpf.getFormatted();
  }

  public getId(): string {
    return this.publicId;
  }

  private normalizeName(name: string): string {
    // Remove caracteres que não sejam letras nem espaços
    let normalized = name.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");

    // Remove espaços extras
    normalized = normalized.trim().replace(/\s+/g, " ");

    // Capitaliza cada palavra (ex: "douglas santana" → "Douglas Santana")
    normalized = normalized
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return normalized;
  }
}
