import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'

import Footer from '@/components/layout/Footer'
import Nav from '@/components/layout/Nav'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants'
import { dmSerifDisplay, ibmPlexMono } from '@/lib/fonts'

import './globals.css'

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#F5EFE3',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-screen bg-paper font-mono text-ink antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:border focus:border-ink-line focus:bg-paper focus:px-4 focus:py-2 focus:text-label focus:uppercase focus:tracking-widest focus:text-ink"
        >
          Skip to content
        </a>

        <Nav />

        {children}

        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
