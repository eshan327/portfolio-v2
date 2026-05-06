import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'

import Footer from '@/components/layout/Footer'
import Nav from '@/components/layout/Nav'
import MotionProvider from '@/components/ui/MotionProvider'
import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_GITHUB,
  SITE_KEYWORDS,
  SITE_LINKEDIN,
  SITE_NAME,
  SITE_PHONE,
  SITE_URL,
} from '@/lib/constants'
import { dmSerifDisplay, ibmPlexMono } from '@/lib/fonts'

import './globals.css'

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'Technology',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} portfolio preview`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: '/opengraph-image', alt: `${SITE_NAME} portfolio preview` }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F5EFE3',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      email: SITE_EMAIL,
      telephone: SITE_PHONE,
      jobTitle: ['Quantitative Developer', 'Incoming Quantitative Trader Intern'],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Maryland, College Park',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Apex Fund',
      },
      knowsAbout: [
        'algorithmic trading',
        'quantitative research',
        'machine learning',
        'software engineering',
      ],
      sameAs: [SITE_LINKEDIN, SITE_GITHUB],
    },
    {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: 'en-US',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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

        <MotionProvider>{children}</MotionProvider>

        <Footer />
        <Analytics />
        <SpeedInsights />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  )
}
