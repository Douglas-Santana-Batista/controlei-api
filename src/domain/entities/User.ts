import { date } from "zod";
import { Cpf } from "./Cpf";
import { Email } from "./Email";
import { Password } from "./Password";

export class User {
  public readonly id_user: number;
  private cpf: Cpf;
  public name: string;
  public email: Email;
  private password: Password;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(id_user: number, cpf: Cpf, name: string, email: Email, password: Password, createdAt: Date, updatedAt: Date) {
    this.id_user = id_user;
    this.cpf = cpf;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public changeName(newName: string): void {
    this.name = newName;
    this.updatedAt = new Date();
  }

  public changeEmail(newEmail: string): string {
    this.updatedAt = new Date();
    return this.email.setEmail(newEmail);
  }

  public getEmail() {
    return this.email.getEmail;
  }

  public changePassword(newPassword: string): string {
    this.updatedAt = new Date();
    return this.password.setPassword(newPassword);
  }

  public changeCpf(newCpf: string) {
    this.updatedAt = new Date();
    return this.cpf.set(newCpf);
  }

  public getCpf() {
    return this.cpf.getFormatted;
  }
}
