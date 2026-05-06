import type { AdditionalWorkItem } from '@/types'

export const ADDITIONAL_WORK: AdditionalWorkItem[] = [
  {
    name: 'Palette',
    summary:
      'Canvas assistant extension focused on privacy-first academic insights with a fully local processing direction.',
    stack: ['React', 'Node.js', 'Docker'],
    isInProgress: true,
  },
  {
    name: 'Kalshi Market Making Bot',
    summary:
      'Earlier spread-capture bot that scanned Kalshi markets, streamed orderbooks, and automated demo or production quoting.',
    stack: ['Python', 'Flask', 'WebSocket'],
    links: [{ label: 'GitHub', href: 'https://github.com/eshan327/Kalshi_MM' }],
  },
  {
    name: 'Corporate Manager',
    summary:
      'Full-stack employee and department manager with Spring Boot APIs, React UI, and MySQL-backed CRUD with role-based filtering.',
    stack: ['Java', 'Spring Boot', 'React', 'MySQL'],
    links: [{ label: 'GitHub', href: 'https://github.com/eshan327/Corporate-Manager' }],
  },
  {
    name: 'Javachain',
    summary:
      'Proof-of-work blockchain prototype with signed transactions, mining, wallet keys, and chain validity checks.',
    stack: ['Java', 'Maven', 'Bouncy Castle'],
    links: [{ label: 'GitHub', href: 'https://github.com/eshan327/Javachain' }],
  },
]
