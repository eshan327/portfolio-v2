import { DM_Serif_Display, IBM_Plex_Mono } from 'next/font/google'

export const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-dm-serif-display',
  display: 'swap',
  preload: true,
})

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  preload: true,
})
