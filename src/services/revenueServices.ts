import prisma from "../models/prisma";
import { generateInstallments } from "../utils/generateInstallments";



export const createRevenueService = async (
    revenueData: {
        revenue_description?: string;
        value: number;
        id_user: number;
        id_category: number;
        id_subcategories?: number;
        installments?: number;
    }
) => {
    const { revenue_description, value, id_user, id_category, id_subcategories, installments} = revenueData;

    const newRevenue = await prisma.revenues.create({
        data: {
            revenue_description,
            value,
            id_user,
            id_category,
            id_subcategories
        }
    });

    if (installments && installments > 1) {
        const generatedInstallments = generateInstallments(new Date(), installments);

        await prisma.installments.createMany({
            data: generatedInstallments.map((inst) => ({
                installments_date: inst.installments_date,
                installments_number: inst.installments_number,
                id_user: id_user,
                id_revenues: newRevenue.id_revenues,
                id_expenses: null
            }))
        });
    }

    return newRevenue;
};