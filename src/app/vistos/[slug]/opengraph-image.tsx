import { ImageResponse } from 'next/og'
import { getVistoBySlug } from '@/lib/actions/vistos'

export const runtime = 'edge'
export const alt = 'Yellow Visa - Visto'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const visto = await getVistoBySlug(params.slug)
  
  if (!visto) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 24,
            background: '#FFBD1A',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0F0005',
          }}
        >
          Yellow Visa - Visto
        </div>
      ),
      {
        ...size,
      }
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#FFBD1A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0F0005',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div>
          <h1 style={{ fontSize: 48, marginBottom: 20 }}>{visto.title}</h1>
          <p style={{ fontSize: 24, opacity: 0.8 }}>{visto.description}</p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
