# 🌐 Site Institucional - Next.js

Um site institucional moderno desenvolvido com Next.js 15, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI
- **Zod** - Validação de dados
- **Server Actions** - Processamento server-side

## 🏃‍♂️ Início Rápido

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Acessar no navegador
# http://localhost:3000
```

## 📁 Estrutura

```
src/
├── app/                 # Páginas (App Router)
│   ├── contato/        # Página de contato
│   ├── sobre/          # Página sobre
│   └── page.tsx        # Página inicial
├── components/         # Componentes React
│   ├── ui/            # Componentes shadcn/ui
│   └── contact-form.tsx
└── lib/               # Utilitários
    ├── actions/       # Server Actions
    └── schemas/       # Validação Zod
```

## 📄 Páginas

- **`/`** - Página inicial com hero e call-to-actions
- **`/sobre`** - Informações institucionais
- **`/contato`** - Formulário de contato funcional

## 🔧 Funcionalidades

- ✅ Layout responsivo
- ✅ Formulário de contato com validação
- ✅ Server Actions para processamento
- ✅ Componentes shadcn/ui
- ✅ Validação com Zod
- ✅ TypeScript completo

## 📚 Documentação

Para documentação completa, consulte [DOCUMENTATION.md](./DOCUMENTATION.md)

## 🛠️ Scripts

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Linting
```

## 🎨 Customização

O projeto está preparado para receber designs do Figma:

- Estrutura de componentes modular
- Tailwind CSS para estilização rápida
- shadcn/ui para componentes consistentes
- TypeScript para desenvolvimento seguro

---

**Pronto para desenvolvimento! 🚀**
