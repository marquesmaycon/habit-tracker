# 📊 Habit Tracker

Um sistema completo de rastreamento de hábitos desenvolvido com Next.js 15, React 19 e Drizzle ORM. 
Organize sua rotina, acompanhe seu progresso e construa hábitos saudáveis de forma eficiente e visual.

## ✨ Funcionalidades

### 📝 Gestão de Hábitos
• **Criação Personalizada**: Adicione hábitos com nome customizado
• **Recorrência Flexível**: Configure para qualquer dia da semana
• **Interface Intuitiva**: Formulário simples e direto para criação
• **Validação Inteligente**: Sistema de validação para garantir dados corretos

### 📅 Controle Diário
• **Marcação Rápida**: Check/uncheck hábitos com um clique
• **Visualização Semanal**: Acompanhe seu progresso em formato de calendário
• **Status Visual**: Indicadores claros de hábitos completados e pendentes
• **Persistência**: Todos os dados são salvos automaticamente

### 📈 Análise e Progresso
• **Progresso Visual**: Barras de progresso para acompanhamento
• **Histórico Completo**: Visualize seu desempenho ao longo do tempo
• **Métricas Detalhadas**: Porcentagem de conclusão por hábito

### 🎨 Interface Moderna
• **Design Responsivo**: Funciona perfeitamente em desktop e mobile
• **Dark Theme**: Interface escura para melhor experiência visual
• **Animações Suaves**: Transições e feedbacks visuais elegantes
• **Componentes Acessíveis**: Interface construída com Radix UI

## 🚀 Como Executar

### Pré-requisitos
• Node.js (versão 18 ou superior)
• PostgreSQL
• npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/marquesmaycon/habit-tracker.git

# Entre no diretório
cd habit-tracker

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas configurações de banco

# Execute as migrações do banco
npm run db:migrate

# Popule o banco com dados de exemplo (opcional)
npm run db:seed

# Execute em modo desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o projeto.

### Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento com Turbopack
npm run build        # Build para produção
npm run start        # Inicia servidor de produção
npm run lint         # Verificação de código com Biome
npm run format       # Formatação de código
npm run db:generate  # Gera migrações do Drizzle
npm run db:migrate   # Executa migrações
npm run db:seed      # Popula banco com dados
npm run db:wipe      # Limpa todos os dados
npm run db:refresh   # Limpa e repopula o banco
```

## 🛠️ Tecnologias

### Core
• **Next.js 15** - Framework React com App Router
• **React 19** - Biblioteca principal com recursos mais recentes
• **TypeScript** - Tipagem estática para maior robustez
• **Turbopack** - Build tool ultra-rápido

### Database & ORM
• **PostgreSQL** - Banco de dados relacional
• **Drizzle ORM** - ORM moderno e type-safe
• **Drizzle Kit** - CLI para migrações e schema

### UI & Styling
• **Tailwind CSS 4** - Framework CSS utilitário
• **Radix UI** - Componentes acessíveis e customizáveis
• **Lucide React** - Ícones modernos e consistentes
• **Class Variance Authority** - Gestão de variantes CSS

### Utilities
• **Day.js** - Manipulação de datas leve e eficiente
• **Zod** - Validação de schemas TypeScript-first
• **clsx & tailwind-merge** - Utilidades para classes CSS

### Qualidade de Código
• **Biome** - Linter e formatter ultra-rápido
• **TypeScript ESLint** - Regras específicas para TypeScript

## 🏗️ Arquitetura

### Estrutura de Pastas

```
app/
├── api/                    # API Routes (Next.js 13+)
│   ├── habits/            # CRUD de hábitos
│   ├── day/               # Gestão de dias
│   └── summary/           # Relatórios e estatísticas
├── globals.css            # Estilos globais
├── layout.tsx             # Layout principal
└── page.tsx               # Página inicial

components/
├── ui/                    # Componentes base (Radix UI)
│   ├── button.tsx
│   ├── checkbox.tsx
│   ├── dialog.tsx
│   └── ...
├── habit-form.tsx         # Formulário de criação
├── habits-list.tsx        # Lista de hábitos
├── summary.tsx            # Tabela de resumo
└── progress-bar.tsx       # Barra de progresso

database/
├── schemas.ts             # Schemas do Drizzle ORM
├── drizzle.ts             # Configuração da conexão
├── seeder.ts              # Dados de exemplo
└── migrations/            # Arquivos de migração
```

### Padrões Utilizados
• **App Router**: Nova arquitetura do Next.js 13+
• **API Routes**: Endpoints RESTful integrados
• **Server Components**: Renderização no servidor por padrão
• **TypeScript First**: Tipagem em todos os níveis
• **Component Composition**: Separação clara de responsabilidades

## 🎮 Como Usar

1. **Criar Hábito**: Clique em "Novo hábito" e preencha o formulário
2. **Definir Recorrência**: Selecione os dias da semana para o hábito
3. **Marcar Conclusão**: Na tabela de resumo, marque os hábitos concluídos
4. **Acompanhar Progresso**: Visualize suas estatísticas na barra de progresso
5. **Analisar Dados**: Use a tabela de resumo para insights sobre seus hábitos

## 📱 Funcionalidades da Interface

### 🖥️ Desktop
• Layout otimizado para telas grandes
• Tabela completa com todos os dados visíveis
• Hover effects e transições suaves

### 📱 Mobile
• Interface adaptativa para smartphones
• Navegação touch-friendly
• Componentes redimensionados automaticamente

## 🚀 Rocketseat

Este projeto foi desenvolvido durante as aulas da **[Rocketseat](https://rocketseat.com.br)**, uma plataforma de educação em tecnologia que oferece conteúdo de alta qualidade para desenvolvedores.

## 👨‍💻 Autor

<div align="center">
  <img src="https://github.com/marquesmaycon.png" width="100px" style="border-radius: 50%"/>
  <br/>
  <strong>Maycon Marques</strong>
  <br/>
  <br/>
  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayconhenrique/)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/marquesmaycon)
  [![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:mayconmarquesh@gmail.com)

  ### Feito com ❤️ e muita 🎵
</div>
