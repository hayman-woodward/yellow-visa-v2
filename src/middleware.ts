import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect do site antigo para o novo
  if (pathname === '/bio') {
    return NextResponse.redirect(new URL('/comecar?etapa=01-inicio', request.url))
  }

  // Redirect de URLs antigas do blog: /blog/slug -> será tratado pela API
  // O Next.js vai capturar /blog/slug e redirecionar via API route
  const blogSlugMatch = pathname.match(/^\/blog\/([^\/]+)$/)
  if (blogSlugMatch && !pathname.startsWith('/blog/destinos') && !pathname.startsWith('/blog/lugares')) {
    // Deixa passar para a API route fazer o redirect
    return NextResponse.next()
  }

  // Lista de rotas válidas do site
  const validRoutes = [
    '/',
    '/blog',
    '/contato',
    '/destinos',
    '/guia-do-imigrante',
    '/sobre',
    '/vistos',
    '/comecar',
    '/result',
    '/politica-de-privacidade',
    '/dashboard',
    '/yv-admin',
    '/api',
    '/sitemap.xml',
    '/robots.txt',
    '/favicon.ico',
    '/icon.svg',
    '/apple-icon'
  ]

  // Verifica se é uma rota válida ou uma sub-rota válida
  const isValidRoute = validRoutes.some(route => 
    pathname === route || 
    pathname.startsWith(route + '/') ||
    pathname.startsWith('/blog/') ||
    pathname.startsWith('/destinos/') ||
    pathname.startsWith('/guia-do-imigrante/') ||
    pathname.startsWith('/vistos/') ||
    pathname.startsWith('/comecar') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/api/')
  )

  // Se não for uma rota válida, redireciona para home
  if (!isValidRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/bio', '/((?!api|_next|favicon.ico|.*\\.).*)']
}
