# Controlei API 🚀

API para organização de finanças pessoais com controle completo de receitas, despesas e parcelamentos. Gerencie entradas, saídas, saldo e categorias de gastos com precisão.

## 🛠️ Tecnologias Principais
- **Runtime**: Node.js v18+
- **Framework**: Express
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT
- **Validação**: Zod
- **Containerização**: Docker
- **Testes**: Jest (em implementação)

## 📦 Como Executar Localmente

### Pré-requisitos
- Node.js v18+
- PostgreSQL 14+ (ou Docker)
- npm

### Passo a Passo
```bash
# 1. Clonar o repositório
git clone git@github.com:Douglas-Santana-Batista/controlei-api.git
cd controlei-api

# 2. Instalar dependências  caso quiser
npm install

# 3. Configurar ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# 4. Iniciar banco de dados com Docker
docker-compose up -d
