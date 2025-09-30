import { Prisma, PrismaClient } from "@prisma/client";
import { Amount } from "src/domain/entities/Amount";
import { Category } from "src/domain/entities/Category";
import { CategoryRepositoryInterface } from "src/domain/interfaces/CategoryRepositoryInterface";

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

  async update(id_category: number, updateData: Category): Promise<Category> {
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
}
