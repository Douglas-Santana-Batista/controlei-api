import { Financial_Flow } from "../enums/financialflow";
import { PaymentType } from "../enums/paymentType";
import { InvalidAmountError } from "../errors/DomainErrors";
import { Amount } from "./Amount";

export class Subcategory {
  public readonly id_subcategory: number;
  public _description: string;
  public value: Amount;
  public payment_type: PaymentType;
  public financialFlow: Financial_Flow;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(id_subcategory: number, description: string, value: Amount, payment_type: PaymentType, financialFlow: Financial_Flow, createdAt: Date, updatedAt: Date) {
    this.id_subcategory = id_subcategory;
    this._description = description;
    this.payment_type = payment_type;
    this.financialFlow = financialFlow;
    this.value = value;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.validate();
  }

  get description(): string {
    return this._description;
  }

  get getpaymentType(): PaymentType {
    return this.payment_type;
  }

  private validate(): void {
    if (this.payment_type) {
      this.payment_type = this.payment_type.toString().toUpperCase() as PaymentType;
    }

    if (this.financialFlow) {
      this.financialFlow = this.financialFlow.toString().toUpperCase() as Financial_Flow;
    }
    if (this._description.length <= 0) {
      throw new InvalidAmountError("Description must be greater than zero");
    }

    if (!Object.values(PaymentType).includes(this.payment_type)) {
      throw new InvalidAmountError("Invalid payment type status");
    }
  }

  public setPaymentStatusCASH(): void {
    this.payment_type = PaymentType.CASH;
  }

  public setPaymentStatusCREDIT_CARD(): void {
    this.payment_type = PaymentType.CREDIT_CARD;
  }

  public setPaymentStatusDEBIT_CARD(): void {
    this.payment_type = PaymentType.DEBIT_CARD;
  }

  public setPaymentStatusPIX(): void {
    this.payment_type = PaymentType.PIX;
  }

  public setFinancialFlowEntry(): void {
    this.financialFlow = Financial_Flow.ENTRY;
  }

  public setFinancialFlowExit(): void {
    this.financialFlow = Financial_Flow.EXIT;
  }

  public changeDescription(newDescription: string) {
    this._description = newDescription;
    this.validate();
    this.updatedAt = new Date();
  }

  get returnValue(): number {
    return this.value.amountValue;
  }

  get amountToString(): string {
    return this.value.toString;
  }

  public amountToCurrencyString(currency: string = "BRL"): string {
    return this.value.toCurrencyString(currency);
  }

  public valueToCents(): number {
    return this.value.toCents();
  }

  public toCents(): number {
    return this.value.toCents();
  }

  public updateSubcategoty() {
    return (this.updatedAt = new Date());
  }

  public setValue(value: number) {
    return this.value.setAmountValue(value);
  }
}
