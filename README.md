# Habit Tracker

Aplicação web para criar hábitos, definir recorrência semanal e acompanhar o progresso diário usando Next.js, Drizzle ORM, PostgreSQL e uma interface moderna.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.9-000000?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql)](https://www.postgresql.org/)
[![Biome](https://img.shields.io/badge/Biome-Quality-60A5FA)](https://biomejs.dev/)

## Demo

Projeto ao vivo: [habit-tracker-nine-olive.vercel.app](https://habit-tracker-nine-olive.vercel.app)

## Sobre

O Habit Tracker é uma aplicação de produtividade para registrar hábitos, configurar em quais dias da semana eles devem ser realizados e acompanhar o progresso em uma visão diária e resumida.

O projeto usa rotas de API do Next.js, modelagem relacional com Drizzle e componentes acessíveis para entregar uma experiência simples, direta e responsiva.

## Funcionalidades

- Criação de hábitos com título personalizado.
- Configuração de recorrência por dia da semana.
- Listagem dos hábitos disponíveis no dia.
- Marcação e desmarcação de hábitos concluídos.
- Resumo de progresso diário.
- Barra de progresso visual.
- Seed e scripts para popular dados de demonstração.
- Rotas de API para hábitos, dia atual, resumo e toggle.

## Stack

- **Next.js 15** com App Router e Turbopack.
- **React 19** e **TypeScript**.
- **Drizzle ORM** e **Drizzle Kit**.
- **PostgreSQL**.
- **Day.js** para manipulação de datas.
- **Zod** para validação.
- **Radix UI** e **Tailwind CSS**.
- **Lucide React** para ícones.
- **Biome** para lint e formatação.

## Arquitetura

```txt
.
├── app/
│   ├── api/              # Rotas de API
│   ├── layout.tsx
│   └── page.tsx
├── components/           # Componentes de interface
├── database/
│   ├── drizzle.ts
│   ├── schemas.ts
│   ├── migrations/
│   └── seeder.ts
└── lib/
```

## Como executar

### Pré-requisitos

- Node.js 18 ou superior.
- npm.
- PostgreSQL.

### Instalação

```bash
git clone https://github.com/marquesmaycon/habit-tracker.git
cd habit-tracker
npm install
```

Configure as variáveis de ambiente com a URL do banco:

```env
DATABASE_URL=
```

Execute as migrações e inicie o projeto:

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

## Scripts disponíveis

```bash
npm run dev                 # Inicia o ambiente local
npm run build               # Gera build de produção
npm run start               # Inicia o build gerado
npm run lint                # Executa Biome check
npm run format              # Formata com Biome
npm run db:generate         # Gera migrations Drizzle
npm run db:migrate          # Executa migrations
npm run db:seed             # Popula dados iniciais
npm run db:wipe             # Remove dados
npm run db:refresh          # Limpa e repopula o banco
npm run db:backfill-random  # Preenche hábitos aleatórios
```

## Destaques técnicos

- Modelagem relacional simples e bem definida para hábitos, dias e conclusões.
- API interna com rotas separadas por recurso.
- Componentes de UI acessíveis com Radix.
- Scripts de seed, wipe e refresh para facilitar demonstrações.
- Organização enxuta, adequada para produto pequeno com base escalável.

---

<div align="center">
  <img src="https://github.com/marquesmaycon.png" width="100px" style="border-radius: 50%"/>
  <br/>
  <strong>Maycon Marques</strong>
  <br/>
  <br/>

  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayconhenrique/)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/marquesmaycon)
  [![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:mayconmarquesh@gmail.com)
</div>
