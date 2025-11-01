import { InvalidAmountError } from "../errors/DomainErrors";

export class Amount {
  private amount: number;

  constructor(amount: number | string) {
    const numericValue = this.safeParse(amount);
    this.validate(numericValue);
    this.amount = numericValue;
  }

  private safeParse(value: number | string): number {
    if (typeof value === "number") {
      return value;
    }

    if (typeof value === "string") {
      const cleaned = value.trim().replace(/[^\d,-]/g, "");

      const lastCommaIndex = cleaned.lastIndexOf(",");
      let normalized = cleaned;

      if (lastCommaIndex !== -1) {
        const beforeComma = cleaned.substring(0, lastCommaIndex).replace(/,/g, "");
        const afterComma = cleaned.substring(lastCommaIndex + 1);
        normalized = `${beforeComma}.${afterComma}`;
      } else {
        normalized = cleaned.replace(/,/g, "");
      }

      const result = parseFloat(normalized);
      return isNaN(result) ? NaN : result;
    }

    return NaN;
  }

  private validate(amount: number): void {
    if (isNaN(amount)) {
      throw new InvalidAmountError("Amount must be a valid number. Examples: '100.50', '100,50', 100.50");
    }
    if (amount < 0) {
      throw new InvalidAmountError("Amount cannot be negative");
    }
    if (!Number.isFinite(amount)) {
      throw new InvalidAmountError("Amount must be a finite number");
    }
  }

  public setAmountValue(newAmount: number | string): void {
    const numericValue = this.safeParse(newAmount);
    this.validate(numericValue);
    this.amount = numericValue;
  }

  get amountValue(): number {
    return this.amount;
  }

  get toString(): string {
    return this.amount.toFixed(2);
  }

  public toCurrencyString(currency: string = "BRL"): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency,
    }).format(this.amount);
  }

  public static fromCents(cents: number): Amount {
    return new Amount(cents / 100);
  }

  public toCents(): number {
    return Math.round(this.amount * 100);
  }
}
