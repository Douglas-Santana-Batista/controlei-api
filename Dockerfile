FROM node:18

# Instala netcat para verificar a conectividade
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
COPY prisma ./prisma/

# Instala as dependências
RUN npm install

# Gera o cliente do Prisma
RUN npx prisma generate

# Copia o restante do código e compila TypeScript
COPY . .
RUN npm run build  # Esta linha compila o TypeScript para JavaScript

# Copia o script de espera
COPY wait-for-db.sh ./
RUN chmod +x wait-for-db.sh

EXPOSE 3000

# Comando para esperar o banco e então iniciar a aplicação
CMD ["./wait-for-db.sh", "db", "5432", "npm", "start"]