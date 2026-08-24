import type { NextConfig } from 'next'

const config: NextConfig = {
  async headers() {
    const scriptSrc = [
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      process.env.NODE_ENV === 'production' ? '' : "'unsafe-eval'",
    ]
      .filter(Boolean)
      .join(' ')

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              scriptSrc,
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' data: blob:",
              "connect-src 'self' https://vitals.vercel-insights.com",
              "frame-ancestors 'none'",
              "object-src 'none'",
              "base-uri 'self'",
            ].join('; '),
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default config
