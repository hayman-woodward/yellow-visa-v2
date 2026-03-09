# 📁 Estrutura do Projeto (Full-Stack) - Yellow Visa

## Filosofia

O projeto utiliza Next.js 15 (App Router), conectando **Frontend e Backend** diretamente na mesma base de código. 

Este projeto segue os princípios:

- **KISS** (Keep It Simple, Stupid) - Sempre optar pela solução mais simples
- **YAGNI** (You Aren't Gonna Need It) - Implementar quando precisar
- **Co-location** - Código relacionado próximo um do outro
- **Feature-based** - Organização por funcionalidade, não por tipo de arquivo
- **Type-Safety** - Tipagem completa de ponta a ponta (TypeScript + Prisma + Zod)

## 🗂️ Estrutura de Pastas

```
yellowvisa-development/
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── (auth)/                    # 🔐 Feature: Autenticação
│   │   │   ├── actions/               # Server actions específicas de auth
│   │   │   │   └── auth.ts            # login(), logout()
│   │   │   ├── components/            # Componentes locais de auth
│   │   │   │   └── login-form.tsx     # Formulário de login
│   │   │   └── yv-admin/              # Rota /yv-admin
│   │   │       ├── layout.tsx         # Layout do admin
│   │   │       └── page.tsx           # Página de login
│   │   │
│   │   ├── (site)/                    # 🌐 Feature: Site público
│   │   │   ├── (home)/                # Rota /
│   │   │   │   ├── components/        # Componentes da home
│   │   │   │   └── page.tsx
│   │   │   ├── blog/                  # Rota /blog
│   │   │   ├── contato/               # Rota /contato
│   │   │   ├── destinos/              # Rota /destinos
│   │   │   ├── sobre/                 # Rota /sobre
│   │   │   ├── vistos/                # Rota /vistos
│   │   │   └── layout.tsx             # Layout do site (header/footer)
│   │   │
│   │   ├── dashboard/                 # 📊 Rota /dashboard (admin)
│   │   ├── layout.tsx                 # Root layout (fonts, metadata)
│   │   └── globals.css                # Estilos globais
│   │
│   ├── components/                    # 🧩 Componentes COMPARTILHADOS
│   │   ├── ui/                        # Componentes base (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── shared/                    # Seções compartilhadas entre páginas
│   │   │   ├── CTABanner.tsx          # Banner de call-to-action
│   │   │   ├── Newsletter.tsx         # Formulário de newsletter
│   │   │   ├── PerguntasFrequentes.tsx
│   │   │   └── ...
│   │   ├── layout/                    # Componentes de layout
│   │   │   ├── YVHeader.tsx           # Header do site
│   │   │   ├── YVFooter.tsx           # Footer do site
│   │   │   └── header/                # Componentes do header
│   │   │       ├── data.ts            # Dados de navegação
│   │   │       └── ...
│   │   └── YV/                        # 🎨 Design System Yellow Visa
│   │       ├── index.ts               # Exports centralizados
│   │       ├── YVButton.tsx           # Botão customizado
│   │       ├── YVCard.tsx
│   │       ├── YVText.tsx
│   │       ├── YVTitle.tsx
│   │       └── ...
│   │
│   └── lib/                           # 🛠️ Utilitários e helpers
│       ├── schemas.ts                 # Schemas Zod (validação)
│       ├── auth.ts                    # Utils de autenticação (JWT, session)
│       ├── utils.ts                   # Funções utilitárias
│       ├── actions/                   # Server actions compartilhadas
│       │   └── contact.ts
│       └── data/
│           └── vistos.ts              # Dados mockados
│
├── public/                            # Arquivos estáticos
│   ├── imgs/                          # Imagens organizadas por feature
│   │   ├── blog/
│   │   │   ├── desktop/              # Imagens desktop (hero-2x.jpg, hero.jpg)
│   │   │   └── mobile/               # Imagens mobile (hero.jpg)
│   │   ├── home/
│   │   │   └── hero-woman.png
│   │   ├── sobre/
│   │   │   ├── desktop/
│   │   │   └── mobile/
│   │   └── vistos/
│   │       └── ...
│   └── svgs/                          # SVGs e ícones
│       ├── icons/                    # Ícones individuais
│       └── logo-yv.svg
│
└── prisma/                            # Database schema
    └── schema.prisma
```

---

## 📋 Regras de Organização

### 1. **Route Groups** `(nome)`

Route groups (pastas com parênteses) organizam rotas sem afetar a URL:

```
app/(auth)/yv-admin/page.tsx    → URL: /yv-admin
app/(site)/sobre/page.tsx       → URL: /sobre
```

**Quando usar:**

- Agrupar rotas com layout comum
- Organizar por funcionalidade/domínio

### 2. **Co-location de Componentes**

Cada rota pode ter sua pasta `components/` para componentes **locais**:

```
app/(site)/sobre/
├── components/
│   ├── HeroSobre.tsx          # Usado APENAS na página sobre
│   ├── NossaMissao.tsx        # Usado APENAS na página sobre
│   └── ...
└── page.tsx
```

**Regra de ouro:**

- Componente usado em **1 lugar** → Local (`components/` da rota)
- Componente usado em **2+ lugares** → Compartilhado (`src/components/`)

### 3. **Feature Actions**

Server actions específicas de uma feature ficam dentro dela:

```
app/(auth)/
├── actions/
│   └── auth.ts                # login(), logout() - usado SÓ em auth
└── components/
    └── login-form.tsx         # Importa: '../actions/auth'
```

**Quando compartilhar:**

- Action usada em múltiplas features → `lib/actions/`

### 4. **Design System (YV/)**

Componentes do design system próprio ficam em `components/YV/`:

```typescript
// ✅ Bom: Import centralizado
import { YVButton, YVText, YVTitle } from '@/components/YV';

// ❌ Evitar: Imports individuais
import YVButton from '@/components/YV/YVButton';
```

**Padrão:**

- Todos os componentes exportados em `index.ts`
- Seguir padrões consistentes (ver `YVButton` como exemplo)

### 5. **Schemas e Validação**

Schemas Zod centralizados em `lib/schemas.ts`:

```typescript
// lib/schemas.ts
export const loginSchema = z.object({ ... });
export const contactSchema = z.object({ ... });

// Importar
import { loginSchema } from '@/lib/schemas';
```

**Quando separar:**

- Quando tiver 10+ schemas, considerar split por domínio

### 6. **Organização de Imagens**

Imagens são organizadas por feature e responsividade:

```
public/imgs/
├── blog/
│   ├── desktop/           # hero-2x.jpg (retina), hero.jpg
│   └── mobile/            # hero.jpg (otimizado mobile)
├── home/
│   ├── hero-woman.png
│   └── yellow-visa-hero-mobile.png
└── sobre/
    ├── desktop/
    └── mobile/
```

**Padrão de nomenclatura:**

- Desktop retina: `nome-2x.jpg`
- Desktop normal: `nome.jpg`
- Mobile: `nome-mobile.jpg` ou pasta `mobile/nome.jpg`

**Uso no código:**

```tsx
<Image
  src="/imgs/blog/desktop/hero.jpg"
  srcSet="/imgs/blog/desktop/hero-2x.jpg 2x"
  alt="Hero"
/>

// Ou com responsividade
<picture>
  <source media="(max-width: 768px)" srcSet="/imgs/blog/mobile/hero.jpg" />
  <img src="/imgs/blog/desktop/hero.jpg" alt="Hero" />
</picture>
```

---

## 🎯 Padrões de Nomenclatura

### Componentes

```typescript
// PascalCase para componentes
YVButton.tsx;
LoginForm.tsx;
HeroHome.tsx;
```

### Actions e Utils

```typescript
// camelCase para funções
auth.ts; // export async function login()
contact.ts; // export async function submitContactForm()
```

### Pastas

```typescript
// kebab-case para rotas
blog/
guia-do-imigrante/
yv-admin/

// PascalCase para agrupamentos técnicos
components/
YV/
```

---

## 🚀 Fluxo de Desenvolvimento

### Criando uma nova feature:

1. **Criar rota**

```
app/(site)/nova-feature/
├── page.tsx
└── layout.tsx (opcional)
```

2. **Adicionar componentes locais**

```
app/(site)/nova-feature/
├── components/
│   └── HeroNovaFeature.tsx
└── page.tsx
```

3. **Se precisar de actions**

```
app/(site)/nova-feature/
├── actions/
│   └── nova-feature.ts
├── components/
└── page.tsx
```

4. **Buscando Dados no Banco (Backend)**

- Crie seu `<Componente>` como `async`.
- Faça a leitura direta apontando pro Prisma (`await prisma.visto.findMany()`).

5. **Mutações / Enviando Dados**

- Crie uma Server Action (`'use server'`) para salvar no banco.
- Integre ela no Formulário (`'use client'`).

6. **Componente usado em 2+ lugares?**

```
Mover para: src/components/shared/
```

---

## 🔧 Decisões Técnicas

### Por que não usar NextAuth.js?

- **Controle total**: JWT customizado com jose
- **Simplicidade**: Sem dependencies extras
- **Neon DB**: Integração direta com Prisma

### Por que Route Groups?

- **Organização visual**: Features agrupadas logicamente
- **Layouts diferentes**: (auth) vs (site) têm layouts distintos
- **URLs limpas**: Não aparecem na URL

### Por que schemas.ts único?

- **KISS**: Projeto pequeno/médio, não justifica split
- **Fácil de encontrar**: Todas validações em 1 lugar
- **Refatorar quando crescer**: Se passar de 10+ schemas

---

## 🔌 Arquitetura Front + Back (Integração)

O projeto dispensa requisições API REST tradicionais, tudo acontece no Next.js Server.

### Server Components vs Client Components

- **Server Components (Leitura de Dados):** É o padrão. A exportação do componente DEVE possuir marcação `async`. O banco (Neon DB) é acessado diretamente no componente através do instanciamento do `PrismaClient`.
- **Client Components (Interatividade e Forms):** São marcados com `'use client'` no topo do arquivo. Serão encarregados de rodar no navegador para lidar com `useState`, `useEffect` e formulários.

### Server Actions (Mutações no Banco)

Ao submeter itens pela UI, disparamos as **Server Actions**:
1. O form (Client Component) envia o `FormData`.
2. Uma Server Action contendo `'use server'` processa os dados no servidor.
3. Ação valida (via Zod), grava no banco (via Prisma) e então chama `revalidatePath('/caminho')` para que o cache seja apagado e a UI exiba os dados mais recentes.

---

## 💻 Setup Local (Como Iniciar o Projeto)

Para desenvolvedores configurando sua máquina:

1. **Requisitos:** Certifique-se de estar usando Node.js superior à versão 18.
2. **Ambiente:** Defina um arquivo `.env` preenchendo as variáveis necessárias (`DATABASE_URL` do Neon).
3. **Variáveis de Node:** Rode comando `npm install` na pasta base.
4. **Banco:** Gere novamente os tipos do BD batendo pro Prisma: `npx prisma generate`.
5. **Rodar Aplicação:** Suba na porta local com `npm run dev`.

---

## 📚 Referências

- [Next.js Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Zod Validation](https://zod.dev/)
- [Prisma + Neon](https://www.prisma.io/docs/orm/overview/databases/neon)

---

## ✅ Checklist de Qualidade (Front & Back)

Antes de criar um PR, verificar:

- [ ] **Data Fetching:** Componentes lendo do Prisma devem ser Server Components (`async`)
- [ ] **Interatividade:** Arquivos com `useState`/formulários contêm `'use client'`
- [ ] **Mutações:** As chamadas usam Server Actions (`'use server'`) e validam tipagem com Zod
- [ ] **Co-location:** Componente usado 1x (local) ou 2+ (compartilhado na pasta correta)?
- [ ] Imports usando `@/` (paths absolutos)
- [ ] Seguindo padrões do `YVButton` (para componentes `YV/`)
- [ ] Sem erros de linter (`npm run lint`)

---

**Última atualização:** 02/10/2025
