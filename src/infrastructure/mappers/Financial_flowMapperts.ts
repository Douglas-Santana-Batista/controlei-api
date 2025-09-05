import { Financial_Flow as DomainFinancialFlow } from "../../domain/enums/financialflow";
import { Financial_Flow as PrismaFinancialFlow } from "@prisma/client";

export class FinancialFlowMapper {
  static toPrisma(domainType: DomainFinancialFlow): PrismaFinancialFlow {
    const mapping: Record<DomainFinancialFlow, PrismaFinancialFlow> = {
      [DomainFinancialFlow.ENTRY]: PrismaFinancialFlow.ENTRY,
      [DomainFinancialFlow.EXIT]: PrismaFinancialFlow.EXIT,
    };

    return mapping[domainType];
  }

  static toDomain(prismaType: PrismaFinancialFlow): DomainFinancialFlow {
    const mapping: Record<PrismaFinancialFlow, DomainFinancialFlow> = {
      [PrismaFinancialFlow.ENTRY]: DomainFinancialFlow.ENTRY,
      [PrismaFinancialFlow.EXIT]: DomainFinancialFlow.EXIT,
    };

    return mapping[prismaType];
  }
}
