export function generateInstallments(startDate: Date, total: number) {
    const installments = [];
    for (let i = 0; i < total; i++) {
        const date = new Date(startDate);
        date.setMonth(date.getMonth() + i);
        installments.push({
            installments_date: date,
            installments_number: i + 1
        });
    }
    return installments;
}