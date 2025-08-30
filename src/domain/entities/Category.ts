import { Amount } from "./Amount";

export class Category {
  public readonly id: string;
  public _name: string;
  private _amount: Amount;

  constructor(id: string, name: string, amount: Amount) {
    this.id = id;
    this._name = name;
    this._amount = amount;
    this.validate();
  }

  public getAmount(): number {
    return this._amount.amountValue;
  }

  public setAmountToString(): void {
    this._amount.toString;
  }

  public updateAmount(newAmount: number | string): void {
    this._amount.setAmountValue(newAmount);
  }

  public amountToCurrencyString(currency: string = "BRL"): string {
    return this._amount.toCurrencyString(currency);
  }

  public amountToCents(): number {
    return this._amount.toCents();
  }

  public amountFromCents(cents: number): void {
    this._amount = Amount.fromCents(cents);
  }

  public getName(): string {
    return this._name;
  }

  private validate(): void {
    if (this.getName.length < 1) {
      throw new Error("Name must be at least 0 characters long");
    }
  }

  public updateName(newName: string): void {
    this._name = newName;
    this.validate();
  }
}
