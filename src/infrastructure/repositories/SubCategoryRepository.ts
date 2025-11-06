import { PrismaClient } from "@prisma/client";
import { Amount } from "src/domain/entities/Amount";
import { Subcategory } from "src/domain/entities/Subcategory";
import { SubcategoryRepositoryInterface } from "src/domain/interfaces/SubcategoryRepositoryInterface";
import { PaymentTypeMapper } from "../mappers/PaymentTypeMapper";
import { FinancialFlowMapper } from "../mappers/Financial_flowMapperts";
import { toDecimal } from "../services/toDecimal";

export class SubCategoryRepository implements SubcategoryRepositoryInterface {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(subcategory: Subcategory, id_category: number, publicId: string): Promise<Subcategory> {
    const valueDecimal = toDecimal(subcategory.returnValue);

    const prismaPaymentType = PaymentTypeMapper.toPrisma(subcategory.getpaymentType);
    const prismaFinancialFlow = FinancialFlowMapper.toPrisma(subcategory.financialFlow);

    const subCategoryData = await this.prisma.subcategory.create({
      data: {
        description: subcategory.description,
        value: valueDecimal,
        payment_type: prismaPaymentType,
        financial_flow: prismaFinancialFlow,
        category: {
          connect: { id_category: id_category },
        },
        user: {
          connect: { publicId },
        },
      },
    });

    const domainPaymentType = PaymentTypeMapper.toDomain(subCategoryData.payment_type);
    const domainFinancialFlow = FinancialFlowMapper.toDomain(subCategoryData.financial_flow);
    return new Subcategory(
      subCategoryData.id_subcategory,
      subCategoryData.description,
      new Amount(subCategoryData.value ? subCategoryData.value.toNumber() : 0),
      domainPaymentType,
      domainFinancialFlow,
      subCategoryData.createdAt,
      subCategoryData.updatedAt
    );
  }

  async findById(id_subcategory: number): Promise<Subcategory | null> {
    const findData = await this.prisma.subcategory.findUnique({
      where: { id_subcategory: id_subcategory },
    });

    if (!findData) return null;

    const domainPaymentType = PaymentTypeMapper.toDomain(findData.payment_type);
    const domainFinancialFlow = FinancialFlowMapper.toDomain(findData.financial_flow);

    return new Subcategory(findData.id_subcategory, findData.description, new Amount(findData.value ? findData.value.toNumber() : 0), domainPaymentType, domainFinancialFlow, findData.createdAt, findData.updatedAt);
  }

  async findAll(publicId: string): Promise<Subcategory[]> {
    const findall = await this.prisma.subcategory.findMany({
      where: {
        user: { publicId },
      },
    });

    return findall.map((findData) => {
      const domainPaymentType = PaymentTypeMapper.toDomain(findData.payment_type);
      const domainFinancialFlow = FinancialFlowMapper.toDomain(findData.financial_flow);
      return new Subcategory(findData.id_subcategory, findData.description, new Amount(findData.value ? findData.value.toNumber() : 0), domainPaymentType, domainFinancialFlow, findData.createdAt, findData.updatedAt);
    });
  }

  async update(subcategory: Subcategory, id_subcategory: number): Promise<Subcategory> {
    const prismaPaymentType = PaymentTypeMapper.toPrisma(subcategory.getpaymentType);
    const prismaFinancialFlow = FinancialFlowMapper.toPrisma(subcategory.financialFlow);

    const dataToUpdate: any = {
      description: subcategory.description,
      value: toDecimal(subcategory.returnValue),
      payment_type: prismaPaymentType,
      financial_flow: prismaFinancialFlow,
      updatedAt: new Date(),
    };

    const update = await this.prisma.subcategory.update({
      where: { id_subcategory },
      data: dataToUpdate,
    });

    const domainPaymentType = PaymentTypeMapper.toDomain(update.payment_type);
    const domainFinancialFlow = FinancialFlowMapper.toDomain(update.financial_flow);

    return new Subcategory(update.id_subcategory, update.description, new Amount(update.value.toNumber()), domainPaymentType, domainFinancialFlow, update.createdAt, update.updatedAt);
  }

  async delete(id_subcategory: number): Promise<void> {
    await this.prisma.subcategory.delete({ where: { id_subcategory } });
  }
}
