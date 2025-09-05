import { PaymentType as DomainPaymentType } from "../../domain/enums/paymentType";
import { PaymentType as PrismaPaymentType } from "@prisma/client";

export class PaymentTypeMapper {
  static toPrisma(domainPaymentType: DomainPaymentType): PrismaPaymentType {
    switch (domainPaymentType) {
      case DomainPaymentType.CASH:
        return PrismaPaymentType.CASH;
      case DomainPaymentType.CREDIT_CARD:
        return PrismaPaymentType.CREDIT_CARD;
      case DomainPaymentType.DEBIT_CARD:
        return PrismaPaymentType.DEBIT_CARD;
      case DomainPaymentType.BOLETO:
        return PrismaPaymentType.BOLETO;
      case DomainPaymentType.PIX:
        return PrismaPaymentType.PIX;
      default:
        throw new Error(`Invalid payment type: ${domainPaymentType}`);
    }
  }

  static toDomain(prismaPaymentType: PrismaPaymentType): DomainPaymentType {
    switch (prismaPaymentType) {
      case PrismaPaymentType.CASH:
        return DomainPaymentType.CASH;
      case PrismaPaymentType.CREDIT_CARD:
        return DomainPaymentType.CREDIT_CARD;
      case PrismaPaymentType.DEBIT_CARD:
        return DomainPaymentType.DEBIT_CARD;
      case PrismaPaymentType.BOLETO:
        return DomainPaymentType.BOLETO;
      case PrismaPaymentType.PIX:
        return DomainPaymentType.PIX;
      default:
        throw new Error(`Invalid payment type: ${prismaPaymentType}`);
    }
  }
}
