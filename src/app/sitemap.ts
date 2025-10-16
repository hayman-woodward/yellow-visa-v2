import { MetadataRoute } from 'next'
import { getPublishedVistos } from '@/lib/actions/vistos'
import { getPublishedDestinos } from '@/lib/actions/destinos'
// import { getRecentBlogPosts } from '@/lib/actions/blog'
// import { getAllFaqGroups } from '@/lib/actions/faq'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yellowvisa.com'
  
  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vistos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // {
    //   url: `${baseUrl}/blog`,
    //   lastModified: new Date(),
    //   changeFrequency: 'daily' as const,
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/guia-do-imigrante`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.8,
    // },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/comecar`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ]

  // Páginas dinâmicas - Vistos
  const vistos = await getPublishedVistos()
  const vistosPages = vistos.map((visto) => ({
    url: `${baseUrl}/vistos/${visto.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Páginas dinâmicas - Destinos
  const destinos = await getPublishedDestinos()
  const destinosPages = destinos.map((destino) => ({
    url: `${baseUrl}/destinos/${destino.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Páginas dinâmicas - Blog
  // const blogPosts = await getRecentBlogPosts(100) // Pegar mais posts para o sitemap
  // const blogPages = blogPosts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }))

  // Páginas dinâmicas - Guia do Imigrante (FAQ Groups)
  // const faqGroups = await getAllFaqGroups()
  // const guiaPages = faqGroups.map((group) => ({
  //   url: `${baseUrl}/guia-do-imigrante/${group.slug}`,
  //   lastModified: new Date(),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return [
    ...staticPages,
    ...vistosPages,
    ...destinosPages,
    // ...blogPages,
    // ...guiaPages,
  ]
}
