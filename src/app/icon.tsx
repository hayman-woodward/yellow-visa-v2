import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
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
          borderRadius: '50%',
        }}
      >
        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.436096" width="32" height="32" rx="16" fill="#FFBD1A"/>
          <path d="M22.1506 10.976L15.8106 21.9233H20.4215L27.3379 9.98241H23.8797C23.1663 9.98241 22.5065 10.3623 22.1506 10.9776V10.976Z" fill="#0F0005"/>
          <path d="M6.58882 25.9026H11.1997L22.727 6H19.2688C18.5554 6 17.8956 6.37987 17.5397 6.99521L6.58882 25.9026Z" fill="#0F0005"/>
          <path d="M10.047 7.99042H5.4361L10.047 15.9521L12.3524 11.9713L10.047 7.99042Z" fill="#0F0005"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
