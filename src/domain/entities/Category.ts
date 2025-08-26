// src/domain/entities/Category.ts
export class Category {
  public readonly id: string;
  public _name: string;
  private _amount: number; // Usando number internamente

  constructor(id: string, name: string, amount: number) {
    this.id = id;
    this._name = name;
    this._amount = amount;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get amount(): number {
    return this._amount;
  }

  private validate(): void {
    if (this.name.length < 3) {
      throw new Error("Name must be at least 3 characters long");
    }

    if (this._amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }

    // Validação de casas decimais
    const decimalPlaces = (this._amount.toString().split(".")[1] || "").length;
    if (decimalPlaces > 2) {
      throw new Error("Amount must have at most 2 decimal places");
    }
  }

  public updateAmount(newAmount: number): void {
    this._amount = newAmount;
    this.validate();
  }

  public updateName(newName: string): void {
    this._name = newName;
    this.validate();
  }
}
