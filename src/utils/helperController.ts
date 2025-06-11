// Função para adicionar meses a uma data de forma segura
export function addMonths(date: Date, months: number): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
  
    // Ajuste para casos onde o dia original não existe no novo mês
    if (newDate.getDate() !== date.getDate()) {
    newDate.setDate(0); // Vai para o último dia do mês anterior
    }
  
    return newDate;
}