export class Installment {
  public readonly id_installment: number;
  public _amount: number;
  public _status: InstallmentStatus;
  public _number: number;
  public readonly createdAt: Date;

  constructor(id_installment: number, amount: number, status: InstallmentStatus, number: number, createdAt: Date) {
    this.id_installment = id_installment;
    this._amount = amount;
    this._status = status;
    this._number = number;
    this.createdAt = createdAt;

    this.validate();
  }

  get amount(): number {
    return this._amount;
  }

  get number(): number {
    return this._number;
  }

  get status(): InstallmentStatus {
    return this._status;
  }

  private validate() {
    if (this.amount <= 0) {
      throw new Error("Value must be greater than zero");
    }

    if (this._number <= 0) {
      throw new Error("Value must be greater than zero");
    }

    if (!Object.values(InstallmentStatus).includes(this._status)) {
      throw new Error("Invalid installment status");
    }

    if (this.createdAt > new Date()) {
      throw new Error("Creation date cannot be in the future");
    }
  }

  public setInstallmentStatusPENDING(): void {
    this._status = InstallmentStatus.PENDING;
  }

  public setInstallmentStatusPAID(): void {
    this._status = InstallmentStatus.PAID;
  }

  public setInstallmentStatusOVERDUE(): void {
    this._status = InstallmentStatus.OVERDUE;
  }

  public changeAmount(newAmount: number) {
    this._amount = newAmount;
    this.validate();
  }

  public changeNumber(newNumber: number) {
    this._number = newNumber;
    this.validate();
  }
}
