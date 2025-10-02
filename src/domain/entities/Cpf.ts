import { InvalidAmountError } from "../errors/DomainErrors";

export class Cpf {
  private cpf: string;

  constructor(cpf: string) {
    if (!cpf) {
      throw new InvalidAmountError("CPF is required");
    }
    if (!this.validation(cpf)) {
      throw new InvalidAmountError("Invalid CPF");
    }
    this.cpf = this.normalizeCpf(cpf);
  }

  private normalizeCpf(cpf: string): string {
    return cpf.replace(/\D/g, "");
  }

  private validation(cpf: string): boolean {
    const normalizedCpf = this.normalizeCpf(cpf);

    // Verifica se tem 11 dígitos
    if (normalizedCpf.length !== 11) {
      throw new InvalidAmountError("CPF must have 11 digits");
    }

    // Verifica se não é uma sequência de números iguais
    if (/^(\d)\1{10}$/.test(normalizedCpf)) {
      return false;
    }

    // Valida os dígitos verificadores
    return this.validateCheckDigits(normalizedCpf);
  }

  private validateCheckDigits(cpf: string): boolean {
    let sum = 0;
    let remainder: number;

    // Valida primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    // Valida segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }

  public get(): string {
    return this.cpf;
  }

  public getFormatted(): string {
    // Retorna no formato: 000.000.000-00
    return this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  public set(newCpf: string): string {
    if (!this.validation(newCpf)) {
      throw new Error("Invalid CPF");
    }
    return (this.cpf = this.normalizeCpf(newCpf));
  }
}
