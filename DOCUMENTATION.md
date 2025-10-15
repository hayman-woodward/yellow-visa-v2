# Yellow Visa Development Documentation

## Server Actions + Async Components Rule

When using server actions in Next.js components, the component must be async to use await.

**Rule:**
- Server action = `async` component
- Client component = `'use client'` + `useEffect`/`use` hooks  
- Server component = `async` + `await` directly

**Why:**
- Server actions run on server (build/request time)
- `await` only works in async functions
- Next.js renders on server before sending to client

**Example:**
```tsx
// ❌ Before (synchronous)
export default function Footer() {
  const vistos = [/* hardcoded */];
}

// ✅ After (async for server action)
export default async function Footer() {
  const vistos = await getFooterVistos();
}
```

**KISS:** If fetching data on server, always `async` + `await`. If user interaction, `'use client'` + hooks.