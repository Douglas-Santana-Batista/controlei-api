import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const MonetaryValueSchema = z.union([
  z.string(),
  z.number()
]).transform(value => {
  // Converter para string
  let strValue = typeof value === 'number' 
    ? value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
    : value.toString();

  // Normalização avançada para formato brasileiro
  strValue = strValue
    // Remove todos os caracteres não numéricos exceto vírgula e ponto
    .replace(/[^\d,]/g, '') 
    // Remove pontos de milhar (qualquer ponto que não seja seguido por 2 dígitos)
    .replace(/\.(?=\d{2})/g, '')
    // Substitui vírgula decimal por ponto
    .replace(/,(\d{1,2})$/, '.$1')
    // Remove qualquer caractere não numérico restante
    .replace(/[^\d.]/g, '');
    
  // Verifica se tem parte decimal
  if (!strValue.includes('.')) {
    return new Prisma.Decimal(`${strValue}.00`);
  }
  // Divide e formata partes
  const [integerPart, decimalPart] = strValue.split('.');
  
  return new Prisma.Decimal(
    `${integerPart.replace(/\D/g, '')}.` +
    `${decimalPart.padEnd(2, '0').slice(0, 2)}`
  );
});

export const dateSchema = z.union([
  // Formato ISO (YYYY-MM-DD)
  z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .transform(str => new Date(str)),
  
  // Formato PT-BR (DD/MM/YYYY)
  z.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/)
    .transform(str => {
      const [day, month, year] = str.split('/');
      return new Date(`${year}-${month}-${day}`);
    }),
  
  // Timestamps e Date nativo
  z.coerce.date()
])
.optional()
.default(new Date())
.transform(date => {
  // Normaliza para UTC sem horas
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  ));
});

export const idSchema = z.string().refine((val) => !isNaN(parseInt(val, 10)), { message: "ID must be a valid number" }).transform((val) => parseInt(val, 10));
export const stringSchema = z.string({required_error: "is mandatory"}).min(1,"must be at least 1 characters long").trim()
export const numberSchema = z.number().int("number must be inside").positive("number must be positive")