import { DM_Serif_Display, IBM_Plex_Mono } from 'next/font/google'

export const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif-display',
})

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
})
