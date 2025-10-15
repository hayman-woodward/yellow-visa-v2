import { ImageResponse } from 'next/og'
import { getDestinoBySlug } from '@/lib/actions/destinos'

export const runtime = 'edge'
export const alt = 'Yellow Visa - Destino'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const destino = await getDestinoBySlug(params.slug)
  
  if (!destino) {
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
          Yellow Visa - Destino
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
          <h1 style={{ fontSize: 48, marginBottom: 20 }}>{destino.name}</h1>
          <p style={{ fontSize: 24, opacity: 0.8 }}>{destino.description}</p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
