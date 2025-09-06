import { Prisma, PrismaClient } from "@prisma/client";
import { Installment } from "src/domain/entities/Installment";
import { InstallmentRepositoryInterface } from "src/domain/interfaces/InstallmentRepositoryInterface";
import { installment_status } from "../mappers/Installments_status";
import { Amount } from "src/domain/entities/Amount";

export class InstallmentRepository implements InstallmentRepositoryInterface {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(installment: Installment, id_subcategory: number, id_user: number): Promise<Installment> {
    const amountDecimal = new Prisma.Decimal(installment._amount.amountValue);
    const installmentData = await this.prisma.installment.create({
      data: {
        amount: amountDecimal,
        status: installment._status,
        number: installment._number,
        id_user: id_user,
        id_subcategory: id_subcategory,
      },
    });
    const domainInstallments = installment_status.toDomain(installmentData.status);
    return new Installment(installmentData.id_installment, new Amount(installmentData.amount ? installmentData.amount.toNumber() : 0), domainInstallments, installmentData.number, installmentData.createdAt);
  }

  async findAll(): Promise<Installment[]> {
    const allData = await this.prisma.installment.findMany();

    return allData.map((data) => {
      const domainInstallments = installment_status.toDomain(data.status);
      return new Installment(data.id_installment, new Amount(data.amount ? data.amount.toNumber() : 0), domainInstallments, data.number, data.createdAt);
    });
  }

  async findById(id_installment: number): Promise<Installment | null> {
    const installmentFind = await this.prisma.installment.findUnique({ where: { id_installment } });

    if (!installmentFind) return null;

    const domainInstallments = installment_status.toDomain(installmentFind.status);
    return new Installment(installmentFind.id_installment, new Amount(installmentFind.amount ? installmentFind.amount.toNumber() : 0), domainInstallments, installmentFind.number, installmentFind.createdAt);
  }

  async delete(id_installment: number): Promise<void> {
    await this.prisma.installment.delete({ where: { id_installment } });
  }
}
