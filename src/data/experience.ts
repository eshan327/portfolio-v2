import type { ExperienceItem } from '@/types'

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'IMC Trading',
    role: 'Quantitative Trader Intern',
    location: 'Chicago, IL',
    dateRange: 'Jun. 2026 - Aug. 2026',
    badge: 'Incoming',
    bullets: [
      "Joining IMC's Chicago trading floor Summer 2026 - focusing on derivatives market-making and quantitative signal research.",
    ],
  },
  {
    company: 'Apex Fund',
    role: 'Quantitative Developer',
    location: 'College Park, MD',
    dateRange: 'Sep. 2024 - Present',
    bullets: [
      'Deployed an algorithmic market-making bot on Kalshi via REST/WebSocket APIs, generating <strong>2% monthly returns</strong> on weather derivative bid-ask spreads.',
      'Built a volatility arbitrage model using IV/RV ratios and term structure signals across <strong>72,000+ earnings events</strong> - Monte Carlo backtests yielded <strong>9% CAGR</strong> and <strong>2.1 Sharpe</strong> with Kelly sizing.',
      'Achieved <strong>83% accuracy</strong> predicting oil market anomalies using SVMs and isolation forests with JAX and XArray.',
    ],
  },
  {
    company: 'Technuf',
    role: 'Software Engineer Intern',
    location: 'Rockville, MD',
    dateRange: 'Jun. 2022 - Aug. 2022',
    bullets: [
      'Created Aphelia StudentConnect, a mobile app deployed to <strong>6+ public schools</strong> and a nonprofit, enabling attendance tracking and engagement analytics.',
      'Built a Flutter/Dart barcode scanning system with MySQL backend and RESTful API - reduced manual error by <strong>85%</strong>.',
      'Implemented a local SQLite database managing <strong>1,700+ students</strong> with full CRUD operations.',
    ],
  },
]
