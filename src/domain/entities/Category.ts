import { Amount } from "./Amount";

export class Category {
  public readonly id_category: number;
  public description: string;
  public budget: Amount;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(id_category: number, name: string, budget: Amount, createdAt: Date, updatedAt: Date) {
    this.id_category = id_category;
    this.description = name;
    this.budget = budget;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.validate();
  }

  public getAmount(): number {
    return this.budget.amountValue;
  }

  public setAmountToString(): void {
    this.budget.toString;
  }

  public updateAmount(newAmount: number | string): void {
    this.budget.setAmountValue(newAmount);
  }

  public amountToCurrencyString(currency: string = "BRL"): string {
    return this.budget.toCurrencyString(currency);
  }

  public amountToCents(): number {
    return this.budget.toCents();
  }

  public amountFromCents(cents: number): void {
    this.budget = Amount.fromCents(cents);
  }

  public getName(): string {
    return this.description;
  }

  private validate(): void {
    if (this.getName.length < 1) {
      throw new Error("Name must be at least 0 characters long");
    }
  }

  public updateName(newName: string): void {
    this.description = newName;
    this.validate();
  }
}
