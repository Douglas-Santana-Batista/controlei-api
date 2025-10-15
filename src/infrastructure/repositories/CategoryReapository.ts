import { Prisma, PrismaClient } from "@prisma/client";
import { Amount } from "src/domain/entities/Amount";
import { Category } from "src/domain/entities/Category";
import { CategoryRepositoryInterface } from "src/domain/interfaces/CategoryRepositoryInterface";
import { PaginationParams, PaginationResult } from "src/domain/types/PaginationTypes";

export class CategoryRepository implements CategoryRepositoryInterface {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(category: Category, publicId: string): Promise<Category> {
    const budgetDecimal = new Prisma.Decimal(category.getAmount());
    const categoryData = await this.prisma.category.create({
      data: {
        description: category.getName(),
        budget: budgetDecimal,
        user: {
          connect: { publicId },
        },
      },
    });
    return new Category(categoryData.id_category, categoryData.description, new Amount(categoryData.budget ? categoryData.budget.toNumber() : 0), categoryData.createdAt, categoryData.updatedAt);
  }

  async findById(id_category: number): Promise<Category | null> {
    const categoryData = await this.prisma.category.findUnique({
      where: { id_category },
    });

    if (!categoryData) return null;

    return new Category(categoryData.id_category, categoryData.description, new Amount(categoryData.budget ? categoryData.budget.toNumber() : 0), categoryData.updatedAt, categoryData.createdAt);
  }

  async findAll(): Promise<Category[]> {
    const categoriesData = await this.prisma.category.findMany();

    return categoriesData.map((categoryData) => {
      return new Category(categoryData.id_category, categoryData.description, new Amount(categoryData.budget ? categoryData.budget.toNumber() : 0), categoryData.createdAt, categoryData.updatedAt);
    });
  }

  async findAllPaginated(params: PaginationParams): Promise<PaginationResult<Category>> {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [categoriesData, total] = await Promise.all([
      this.prisma.category.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { user: true },
      }),
      this.prisma.category.count(),
    ]);

    const categories = categoriesData.map((categoryData) => this.toDomain(categoryData));

    const totalPages = Math.ceil(total / limit);

    return {
      data: categories,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  async update(updateData: Category, id_category: number): Promise<Category> {
    const budgetDecimal = new Prisma.Decimal(updateData.budget.amountValue);
    const categoryData = await this.prisma.category.update({
      where: { id_category },
      data: {
        description: updateData.description,
        budget: budgetDecimal,
        updatedAt: updateData.updatedAt,
      },
    });

    return new Category(categoryData.id_category, categoryData.description, new Amount(categoryData.budget ? categoryData.budget.toNumber() : 0), categoryData.createdAt, categoryData.updatedAt);
  }

  async delete(id_category: number): Promise<void> {
    await this.prisma.category.delete({
      where: { id_category },
    });
  }

  private toDomain(categoryData: any): Category {
    return new Category(categoryData.id_category, categoryData.description, new Amount(categoryData.budget?.toNumber() ?? 0), categoryData.createdAt, categoryData.updatedAt);
  }
}
