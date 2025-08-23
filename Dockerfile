# ---------- Etapa 1: Build ----------
FROM node:18-alpine AS builder
WORKDIR /app

# Dependências necessárias para Prisma rodar no alpine
RUN apk add --no-cache openssl

# Copia arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instala dependências (inclui dev para compilar TS e Prisma)
RUN npm install

# Gera Prisma Client
RUN npx prisma generate

# Copia o resto do código
COPY . .

# Compila o TypeScript
RUN npm run build

# ---------- Etapa 2: Runtime ----------
FROM node:18-alpine AS runtime
WORKDIR /app

# Dependências mínimas para rodar (openssl pro Prisma)
RUN apk add --no-cache openssl

# Copia apenas arquivos necessários
COPY package*.json ./
COPY prisma ./prisma/

# Instala só dependências de produção
RUN npm install --omit=dev

# Copia build e Prisma Client da etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copia script de espera
COPY wait-for-db.sh ./
RUN chmod +x wait-for-db.sh

EXPOSE 3000

CMD ["./wait-for-db.sh", "db", "5432", "npm", "start"]
