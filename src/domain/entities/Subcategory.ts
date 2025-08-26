import { payment_type } from "../enums/paymentType";

export class Subcategory {
  public readonly id_subcategory: number;
  private _description: string;
  private _value: number;
  private payment_type: payment_type;

  constructor(id_subcategory: number, description: string, value: number, payment_type: payment_type) {
    this.id_subcategory = id_subcategory;
    this._description = description;
    this.payment_type = payment_type;
    this._value = value;

    this.validate();
  }

  get value(): number {
    return this._value;
  }

  get description(): string {
    return this._description;
  }

  get paymentType(): payment_type {
    return this.payment_type;
  }

  public setPaymentStatusCASH(): void {
    this.payment_type = payment_type.CASH;
  }

  private validate(): void {
    if (this._description.length <= 0) {
      throw new Error("Description must be greater than zero");
    }

    if (this._value <= 0) {
      throw new Error("Value must be greater than zero");
    }

    if (!Object.values(payment_type).includes(this.payment_type)) {
      throw new Error("Invalid payment type status");
    }
  }

  public setPaymentStatusCREDIT_CARD(): void {
    this.payment_type = payment_type.CREDIT_CARD;
  }

  public setPaymentStatusDEBIT_CARD(): void {
    this.payment_type = payment_type.DEBIT_CARD;
  }

  public setPaymentStatusPIX(): void {
    this.payment_type = payment_type.PIX;
  }

  public changeDescription(newDescription: string) {
    this._description = newDescription;
    this.validate();
  }

  public changeValue(newValue: number) {
    this._value = newValue;
    this.validate();
  }
}
