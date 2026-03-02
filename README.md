# Simulador de Investimentos

Uma aplicação web moderna para simular e visualizar o crescimento de investimentos ao longo do tempo.

## 🎯 Sobre o Projeto

O Simulador de Investimentos é uma ferramenta interativa que permite aos usuários:

- Calcular o crescimento de investimentos baseado em parâmetros personalizados
- Visualizar graficamente a evolução do capital ao longo dos anos
- Comparar o valor investido com o valor total acumulado
- Analisar o impacto dos aportes mensais e da taxa de rentabilidade

A aplicação utiliza cálculos de juros compostos para simular diferentes cenários de investimento, permitindo uma melhor compreensão do poder dos investimentos a longo prazo.

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Next.js 16.1** - Framework React com renderização SSR/SSG
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Radix UI** - Componentes acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Chart.js** - Visualização de gráficos
- **Lucide React** - Ícones

### Desenvolvimento

- **pnpm** - Gerenciador de pacotes rápido
- **ESLint** - Linter para qualidade de código
- **PostCSS** - Processamento de CSS
- **Autoprefixer** - Compatibilidade cross-browser

## 📋 Pré-requisitos

- Node.js 18+
- pnpm 8+ (ou npm/yarn)

## 🚀 Como Instalar e Rodar

### 1. Clonar o repositório

```bash
git clone https://github.com/YagoMaia/demoday_frontend
cd demoday_frontend
```

### 2. Instalar dependências

```bash
pnpm install
```

### 3. Rodar em desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

### 4. Build para produção

```bash
pnpm build
pnpm start
```

## 📂 Estrutura do Projeto

```
frontend/
├── app/                          # Diretório principal do Next.js (App Router)
│   ├── layout.tsx               # Layout raiz
│   ├── page.tsx                 # Página principal com lógica de simulação
│   └── globals.css              # Estilos globais
│
├── components/                   # Componentes React
│   ├── growth-chart.tsx         # Gráfico de crescimento
│   ├── header.tsx               # Cabeçalho da aplicação
│   ├── result-cards.tsx         # Cards com resultados da simulação
│   ├── simulation-form.tsx      # Formulário de entrada de dados
│   ├── theme-provider.tsx       # Provider de tema (light/dark)
│   └── ui/                      # Componentes reutilizáveis (Radix UI)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── spinner.tsx
│       └── ... (outros componentes)
│
├── hooks/                        # Custom React Hooks
│   ├── use-mobile.ts            # Detecta dispositivos móveis
│   └── use-toast.ts             # Notificações toast
│
├── lib/                          # Utilitários
│   └── utils.ts                 # Funções auxiliares
│
├── public/                       # Arquivos estáticos
├── styles/                       # Arquivos de estilo
├── package.json                  # Dependências e scripts
├── tsconfig.json                 # Configuração TypeScript
├── next.config.mjs               # Configuração Next.js
├── tailwind.config.ts            # Configuração Tailwind CSS
└── postcss.config.mjs            # Configuração PostCSS
```

## 📝 Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Cria um build otimizado para produção
- `pnpm start` - Inicia o servidor de produção
- `pnpm lint` - Executa o ESLint para verificar qualidade do código

## 🎨 Componentes Principais

### Page.tsx

Componente principal que:

- Gerencia o estado do formulário
- Realiza cálculos de simulação
- Passa dados para componentes filhos

### SimulationForm

Formulário para entrada de dados:

- Valor inicial de investimento
- Aporte mensal
- Taxa anual de retorno
- Período em anos

### GrowthChart

Visualização gráfica:

- Linha do valor total acumulado
- Linha do valor investido
- Comparação visual do crescimento

### ResultCards

Exibe os resultados:

- Valor final
- Retorno total (lucro)
- Rendimento percentual

## 🌓 Tema

A aplicação suporta tema claro e escuro, gerenciado através do `ThemeProvider` utilizando `next-themes`.

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:

- Desktop
- Tablet
- Dispositivos móveis

## ♿ Acessibilidade

Utiliza componentes do Radix UI que seguem padrões WCAG 2.1 para melhor acessibilidade.

## 🤝 Como Contribuir

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👤 Autor

Desenvolvido para DemoDay.

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato ou abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando Next.js e React**
