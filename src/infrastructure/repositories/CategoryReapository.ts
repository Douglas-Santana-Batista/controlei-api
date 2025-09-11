import { Prisma, PrismaClient } from "@prisma/client";
import { Amount } from "src/domain/entities/Amount";
import { Category } from "src/domain/entities/Category";
import { CategoryRepositoryInterface } from "src/domain/interfaces/CategoryRepositoryInterface";

export class CategoryRepository implements CategoryRepositoryInterface {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(category: Category, id_user: number): Promise<Category> {
    const budgetDecimal = new Prisma.Decimal(category.budget.amountValue);
    const categoryData = await this.prisma.category.create({
      data: {
        description: category.getName(),
        budget: budgetDecimal,
        user: {
          connect: { id_user },
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

  async update(id_category: number, id_user: number, updateData: Partial<{ description: string; amount: Amount }>): Promise<Category> {
    const dataToUpdate: any = {};

    if (updateData.description !== undefined) {
      dataToUpdate.description = updateData.description;
    }

    if (updateData.amount !== undefined) {
      dataToUpdate.budget = new Prisma.Decimal(updateData.amount.amountValue);
    }

    dataToUpdate.updatedAt = new Date();

    const categoryData = await this.prisma.category.update({
      where: { id_category, id_user },
      data: dataToUpdate,
    });

    return new Category(categoryData.id_category, categoryData.description, new Amount(categoryData.budget ? categoryData.budget.toNumber() : 0), categoryData.createdAt, categoryData.updatedAt);
  }

  async delete(id_category: number): Promise<void> {
    await this.prisma.category.delete({
      where: { id_category },
    });
  }
}
