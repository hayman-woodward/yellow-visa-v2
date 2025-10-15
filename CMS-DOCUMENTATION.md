# 📚 Documentação do CMS Headless - Yellow Visa

## Visão Geral

Este CMS headless gerencia 3 entidades principais: **Vistos**, **Histórias de Imigração** e **Destinos**.

Todas as entidades seguem o mesmo padrão CRUD implementado em `usuarios`, mas com campos otimizados para consumo no front-end.

---

## 🗂️ Estrutura das Entidades

### 1. Vistos

**Campos:**
- `id` (UUID)
- `title` (string) - Ex: "Visto de Turismo para Portugal"
- `slug` (string, unique) - Ex: "visto-turismo-portugal"
- `description` (string) - Descrição do visto
- `imageUrl` (string, opcional) - URL externa da imagem
- `country` (string) - País do visto
- `vistoType` (enum) - `turismo`, `trabalho`, `estudo`, `investidor`
- `status` (enum) - `draft`, `published`
- `createdAt`, `updatedAt` (timestamps)

**Server Actions:**
```typescript
// src/app/dashboard/vistos/actions.ts
createVisto(prevState, formData) → VistoResult
updateVisto(prevState, formData) → VistoResult
deleteVisto(id) → { success: boolean }
```

**Rotas Dashboard:**
- `/dashboard/vistos` - Lista
- `/dashboard/vistos/novo` - Criar
- `/dashboard/vistos/[id]/editar` - Editar

---

### 2. Histórias de Imigração

**Campos:**
- `id` (UUID)
- `title` (string) - Ex: "Minha jornada para Portugal"
- `slug` (string, unique) - Ex: "minha-jornada-portugal"
- `content` (string) - História completa
- `imageUrl` (string, opcional) - URL externa da imagem
- `authorName` (string) - Nome do autor
- `country` (string) - País da história
- `status` (enum) - `draft`, `published`
- `createdAt`, `updatedAt` (timestamps)

**Server Actions:**
```typescript
// src/app/dashboard/historias/actions.ts
createHistoria(prevState, formData) → HistoriaResult
updateHistoria(prevState, formData) → HistoriaResult
deleteHistoria(id) → { success: boolean }
```

**Rotas Dashboard:**
- `/dashboard/historias` - Lista
- `/dashboard/historias/novo` - Criar
- `/dashboard/historias/[id]/editar` - Editar

---

### 3. Destinos

**Campos:**
- `id` (UUID)
- `name` (string) - Ex: "Lisboa"
- `slug` (string, unique) - Ex: "lisboa"
- `description` (string) - Descrição do destino
- `imageUrl` (string, opcional) - URL externa da imagem
- `country` (string) - País
- `continent` (enum) - `América do Norte`, `América do Sul`, `Europa`, `Ásia`, `África`, `Oceania`
- `highlights` (string, opcional) - Principais atrativos
- `status` (enum) - `draft`, `published`
- `createdAt`, `updatedAt` (timestamps)

**Server Actions:**
```typescript
// src/app/dashboard/destinos/actions.ts
createDestino(prevState, formData) → DestinoResult
updateDestino(prevState, formData) → DestinoResult
deleteDestino(id) → { success: boolean }
```

**Rotas Dashboard:**
- `/dashboard/destinos` - Lista
- `/dashboard/destinos/novo` - Criar
- `/dashboard/destinos/[id]/editar` - Editar

---

## 🎨 Consumo no Front-End com YVcomponentes

### Exemplo 1: Lista de Vistos na Home

```tsx
// app/(site)/(home)/page.tsx
import { PrismaClient } from '@prisma/client';
import { YVSection, YVGrid, YVCard, YVTitle, YVText, YVButton } from '@/components/YV';

const prisma = new PrismaClient();

export default async function HomePage() {
  // Buscar vistos publicados
  const vistos = await prisma.visto.findMany({
    where: { status: 'published' },
    take: 6,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <YVSection>
      <YVTitle title='Nossos Vistos' />
      
      <YVGrid cols={3} gap={6}>
        {vistos.map((visto) => (
          <YVCard key={visto.id}>
            {visto.imageUrl && (
              <img src={visto.imageUrl} alt={visto.title} className='w-full h-48 object-cover' />
            )}
            <YVTitle title={visto.title} level='h3' />
            <YVText>{visto.description}</YVText>
            <YVButton 
              variant='primary' 
              href={`/vistos/${visto.slug}`}
            >
              Saiba Mais
            </YVButton>
          </YVCard>
        ))}
      </YVGrid>
    </YVSection>
  );
}
```

### Exemplo 2: Página Individual de Visto

```tsx
// app/(site)/vistos/[slug]/page.tsx
import { PrismaClient } from '@prisma/client';
import { YVSection, YVTitle, YVText } from '@/components/YV';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function VistoPage({ params }: { params: { slug: string } }) {
  const visto = await prisma.visto.findUnique({
    where: { slug: params.slug, status: 'published' }
  });

  if (!visto) notFound();

  return (
    <YVSection>
      {visto.imageUrl && (
        <img src={visto.imageUrl} alt={visto.title} className='w-full h-96 object-cover rounded-2xl mb-8' />
      )}
      
      <YVTitle title={visto.title} />
      <YVText variant='small' className='mb-4'>
        {visto.country} • {visto.vistoType}
      </YVText>
      <YVText>{visto.description}</YVText>
    </YVSection>
  );
}
```

### Exemplo 3: Grid de Destinos

```tsx
// app/(site)/destinos/page.tsx
import { PrismaClient } from '@prisma/client';
import { YVSection, YVGrid, YVCard, YVTitle, YVText } from '@/components/YV';

const prisma = new PrismaClient();

export default async function DestinosPage() {
  const destinos = await prisma.destino.findMany({
    where: { status: 'published' },
    orderBy: { name: 'asc' }
  });

  // Agrupar por continente
  const groupedByContinent = destinos.reduce((acc, destino) => {
    if (!acc[destino.continent]) {
      acc[destino.continent] = [];
    }
    acc[destino.continent].push(destino);
    return acc;
  }, {} as Record<string, typeof destinos>);

  return (
    <YVSection>
      {Object.entries(groupedByContinent).map(([continent, destinosList]) => (
        <div key={continent} className='mb-12'>
          <YVTitle title={continent} level='h2' />
          
          <YVGrid cols={3} gap={6}>
            {destinosList.map((destino) => (
              <YVCard key={destino.id}>
                {destino.imageUrl && (
                  <img src={destino.imageUrl} alt={destino.name} className='w-full h-48 object-cover' />
                )}
                <YVTitle title={destino.name} level='h3' />
                <YVText variant='small'>{destino.country}</YVText>
                <YVText>{destino.description}</YVText>
              </YVCard>
            ))}
          </YVGrid>
        </div>
      ))}
    </YVSection>
  );
}
```

### Exemplo 4: Histórias de Imigração

```tsx
// app/(site)/historias/page.tsx
import { PrismaClient } from '@prisma/client';
import { YVSection, YVGrid, YVCard, YVTitle, YVText } from '@/components/YV';

const prisma = new PrismaClient();

export default async function HistoriasPage() {
  const historias = await prisma.historia.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <YVSection>
      <YVTitle title='Histórias de Sucesso' />
      
      <YVGrid cols={2} gap={8}>
        {historias.map((historia) => (
          <YVCard key={historia.id} className='flex gap-6'>
            {historia.imageUrl && (
              <img 
                src={historia.imageUrl} 
                alt={historia.authorName} 
                className='w-24 h-24 rounded-full object-cover' 
              />
            )}
            <div>
              <YVTitle title={historia.title} level='h3' />
              <YVText variant='small' className='mb-2'>
                Por {historia.authorName} • {historia.country}
              </YVText>
              <YVText className='line-clamp-3'>{historia.content}</YVText>
            </div>
          </YVCard>
        ))}
      </YVGrid>
    </YVSection>
  );
}
```

---

## 🔄 Revalidação (ISR / On-Demand)

Para melhor performance e SEO, use estratégias de revalidação:

### ISR (Incremental Static Regeneration)

```tsx
export const revalidate = 3600; // revalida a cada 1 hora

export default async function VistoPage() {
  // ... seu código
}
```

### On-Demand Revalidation

Já está implementado nos Server Actions com `revalidatePath()`:

```typescript
revalidatePath('/dashboard/vistos'); // invalida cache do dashboard
```

Para invalidar páginas públicas, adicione:

```typescript
revalidatePath('/vistos'); // invalida lista pública
revalidatePath(`/vistos/${slug}`); // invalida página específica
```

---

## 📦 Payloads de Exemplo

### Criar Visto

```json
{
  "title": "Visto de Trabalho para Portugal",
  "slug": "visto-trabalho-portugal",
  "description": "Visto para trabalhar legalmente em Portugal",
  "imageUrl": "https://example.com/portugal-work.jpg",
  "country": "Portugal",
  "vistoType": "trabalho",
  "status": "published"
}
```

### Criar História

```json
{
  "title": "Minha jornada para o Canadá",
  "slug": "minha-jornada-canada",
  "content": "Em 2020, decidi mudar minha vida...",
  "imageUrl": "https://example.com/author.jpg",
  "authorName": "Maria Silva",
  "country": "Canadá",
  "status": "published"
}
```

### Criar Destino

```json
{
  "name": "Toronto",
  "slug": "toronto",
  "description": "A maior cidade do Canadá",
  "imageUrl": "https://example.com/toronto.jpg",
  "country": "Canadá",
  "continent": "América do Norte",
  "highlights": "CN Tower, Royal Ontario Museum",
  "status": "published"
}
```

---

## 🎯 Próximos Passos

1. **Replicar o CRUD de Vistos** para Histórias e Destinos (mesma estrutura)
2. **Implementar Upload de Imagens** (Cloudinary, S3, etc)
3. **Adicionar Filtros** (por país, tipo, continente)
4. **Adicionar Busca** (full-text search no Prisma)
5. **Criar Relacionamentos** (ex: Visto → Destino)

---

**Criado por:** Yellow Visa Dev Team  
**Última Atualização:** 02/10/2025

