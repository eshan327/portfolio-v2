import type { Project } from '@/types'

export const PROJECTS: Project[] = [
  {
    index: '01',
    nameLines: ['Kalshi', 'Crypto', 'Pricing Bot'],
    italicLine: 1,
    description:
      'Built a modular statistical-arbitrage runtime for Kalshi 15-minute BTC and ETH contracts, blending synthetic index feeds with live orderbook microstructure signals in a single dashboard stack.',
    metric: {
      value: '5',
      label: 'exchange feeds fused into deterministic state: Coinbase, Kraken, Gemini, Bitstamp, and Paxos',
    },
    stack: ['Python', 'Flask', 'WebSocket', 'Kalshi API'],
    links: [{ label: 'GitHub', href: 'https://github.com/eshan327/kalshi-arb' }],
  },
  {
    index: '02',
    nameLines: ['Auditory', 'Intent', 'Classifier'],
    italicLine: 1,
    description:
      'Trained intent classifiers on ReCANVo nonverbal vocalizations with a full audio pipeline spanning denoising, MFCC and entropy features, and spectrogram-based modeling.',
    metric: {
      value: '1st',
      label: 'UMD ML competition finish out of 500+ participants over 7,000+ labeled audio samples',
    },
    stack: ['PyTorch', 'Scikit-learn', 'Librosa', 'Polars'],
    links: [{ label: 'Website', href: 'https://learningtheunspoken.github.io' }],
  },
  {
    index: '03',
    nameLines: ['Cont-Kukanov', 'SOR', 'Backtester'],
    italicLine: 0,
    description:
      'Implemented a Kafka-driven smart order router backtesting system with the Cont-Kukanov cost model, then benchmarked allocator behavior against Best Ask, TWAP, and VWAP execution baselines.',
    metric: {
      value: '4',
      label: 'strategies evaluated with reproducible grid-search tuning over queue and fill penalties',
    },
    stack: ['Python', 'Kafka', 'EC2'],
    links: [{ label: 'GitHub', href: 'https://github.com/eshan327/Cont-Kukanov-SOR' }],
  },
  {
    index: '04',
    nameLines: ['Poisson', 'Disk', 'Sequences'],
    italicLine: 1,
    description:
      "Implemented Bridson's Poisson-disk sampling in Rust with 2D and 3D controls, then compiled to WebAssembly for interactive distance-constrained generation directly in the browser.",
    metric: {
      value: '<3s',
      label: 'interactive browser render times with optimized spatial-grid lookups',
    },
    stack: ['Rust', 'WebAssembly'],
    links: [{ label: 'GitHub', href: 'https://github.com/eshan327/Poisson-Disk-Sequences' }],
  },
  {
    index: '05',
    nameLines: ['Grocery', 'Zone'],
    italicLine: 1,
    description:
      'Built a Django and PostgreSQL grocery platform with geolocation-powered store discovery, map-centric browsing, and wishlist-driven purchase planning for local shopping workflows.',
    metric: {
      value: 'Mapbox',
      label: 'geospatial store browsing and discovery integrated into the shopping flow',
    },
    stack: ['Django', 'PostgreSQL', 'Mapbox', 'JavaScript'],
    links: [{ label: 'GitHub', href: 'https://github.com/eshan327/GroceryZone' }],
  },
]
