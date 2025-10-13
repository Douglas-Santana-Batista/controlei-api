import { PrismaClient } from "@prisma/client";
import { Installment } from "src/domain/entities/Installment";
import { InstallmentRepositoryInterface } from "src/domain/interfaces/InstallmentRepositoryInterface";
import { installment_status } from "../mappers/Installments_status";
import { Amount } from "src/domain/entities/Amount";
import { prepareData } from "../services/installmentService";

export class InstallmentRepository implements InstallmentRepositoryInterface {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(installment: Installment, id_subcategory: number, publicId: string): Promise<Installment[]> {
    const preparedata = prepareData(installment, publicId, id_subcategory);
    const installmentData = await this.prisma.$transaction(preparedata.map((data) => this.prisma.installment.create({ data })));

    return installmentData.map((installment) => {
      const domainInstallments = installment_status.toDomain(installment.status);
      return new Installment(installment.id_installment, new Amount(installment.amount ? installment.amount.toNumber() : 0), domainInstallments, installment.number, installment.createdAt);
    });
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

  async delete(group_public_id: string): Promise<void> {
    await this.prisma.installment.deleteMany({
      where: { group_public_id },
    });
  }
}
