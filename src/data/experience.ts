import type { ExperienceItem } from '@/types'

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'IMC Trading',
    role: 'Quantitative Trader Intern',
    location: 'Chicago, IL',
    dateRange: 'Jun. 2026 – Aug. 2026',
    badge: 'Incoming',
    bullets: [
      "Incoming to IMC's Chicago trading floor in Summer 2026 to build derivatives market-making and quantitative signal tooling.",
    ],
  },
  {
    company: 'Apex Fund',
    role: 'Quantitative Developer',
    location: 'College Park, MD',
    dateRange: 'Sep. 2024 – Present',
    bullets: [
      'Built and deployed a Kalshi market-making bot over REST/WebSocket APIs, sustaining <strong>2% monthly returns</strong> across weather-derivative bid-ask spreads.',
      'Researched and backtested volatility arbitrage signals across <strong>72,000+ earnings events</strong>; portfolio simulation produced <strong>9% CAGR</strong> and <strong>2.1 Sharpe</strong> with Kelly sizing.',
      'Shipped oil-market anomaly detection models with SVMs and isolation forests, reaching <strong>83% accuracy</strong> in out-of-sample tests.',
    ],
  },
  {
    company: 'Technuf',
    role: 'Software Engineer Intern',
    location: 'Rockville, MD',
    dateRange: 'Jun. 2022 – Aug. 2022',
    bullets: [
      'Shipped Aphelia StudentConnect to <strong>6+ public schools</strong> and a nonprofit, enabling attendance tracking and engagement analytics.',
      'Implemented Flutter barcode scanning with MySQL and REST APIs, reducing manual data-entry error by <strong>85%</strong>.',
      'Engineered a local SQLite data layer for <strong>1,700+ students</strong> with full CRUD operations and offline reliability.',
    ],
  },
]
