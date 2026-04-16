import { ImageResponse } from 'next/og'

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants'

export const runtime = 'edge'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const [dmSerifItalic, ibmPlexMono] = await Promise.all([
    fetch(new URL('../assets/fonts/DMSerifDisplay-Italic.ttf', import.meta.url)).then(res =>
      res.arrayBuffer()
    ),
    fetch(new URL('../assets/fonts/IBMPlexMono-Regular.ttf', import.meta.url)).then(res =>
      res.arrayBuffer()
    ),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          background: '#F5EFE3',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
        }}
      >
        <p
          style={{
            fontFamily: 'IBM Plex Mono',
            fontSize: 18,
            color: '#736352',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {SITE_URL.replace('https://', '')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h1
            style={{
              fontFamily: 'DM Serif Display',
              fontSize: 120,
              color: '#B5702E',
              lineHeight: 0.88,
              margin: 0,
              fontStyle: 'italic',
            }}
          >
            {SITE_NAME}.
          </h1>
          <p style={{ fontFamily: 'IBM Plex Mono', fontSize: 22, color: '#1A1510', margin: 0 }}>
            {SITE_DESCRIPTION}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'DM Serif Display', data: dmSerifItalic, style: 'italic' },
        { name: 'IBM Plex Mono', data: ibmPlexMono, style: 'normal' },
      ],
    }
  )
}
