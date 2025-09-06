import { InstallmentStatus as DomainInstallmentsStatus } from "../../domain/enums/installmentStatus";
import { InstallmentStatus as PrismaInstallmentsStatus } from "@prisma/client";

export class installment_status {
  static toPrisma(domainType: DomainInstallmentsStatus): PrismaInstallmentsStatus {
    const mapping: Record<DomainInstallmentsStatus, PrismaInstallmentsStatus> = {
      [DomainInstallmentsStatus.PENDING]: PrismaInstallmentsStatus.PENDING,
      [DomainInstallmentsStatus.PAID]: PrismaInstallmentsStatus.PAID,
      [DomainInstallmentsStatus.OVERDUE]: PrismaInstallmentsStatus.OVERDUE,
    };

    return mapping[domainType];
  }

  static toDomain(prismaType: PrismaInstallmentsStatus): DomainInstallmentsStatus {
    const mapping: Record<PrismaInstallmentsStatus, DomainInstallmentsStatus> = {
      [PrismaInstallmentsStatus.PENDING]: DomainInstallmentsStatus.PENDING,
      [PrismaInstallmentsStatus.PAID]: DomainInstallmentsStatus.PAID,
      [PrismaInstallmentsStatus.OVERDUE]: DomainInstallmentsStatus.OVERDUE,
    };

    return mapping[prismaType];
  }
}
