export class Amount {
  private amount: number;

  constructor(amount: number | string) {
    const numericValue = typeof amount === "string" ? parseFloat(amount) : amount;

    this.validate(numericValue);
    this.amount = numericValue;
  }

  private validate(amount: number): void {
    if (isNaN(amount)) {
      throw new Error("Amount must be a valid number");
    }

    if (amount < 0) {
      throw new Error("Amount cannot be negative");
    }

    if (!Number.isFinite(amount)) {
      throw new Error("Amount must be a finite number");
    }
  }

  public setAmountAmount(newAmount: number | string): void {
    const numericValue = typeof newAmount === "string" ? parseFloat(newAmount) : newAmount;
    this.validate(numericValue);
    this.amount = numericValue;
  }

  get amountValue(): number {
    return this.amount;
  }

  get toString(): string {
    return this.amount.toFixed(2);
  }

  // Retorna o valor formatado com símbolo monetário
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
