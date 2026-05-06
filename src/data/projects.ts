import type { Project } from '@/types'

export const PROJECTS: Project[] = [
  {
    index: '01',
    nameLines: ['Auditory', 'Intent', 'Classifier'],
    italicLine: 1,
    description:
      'Full ML pipeline classifying expressive intent from nonverbal vocalizations to support autism research. Built with PyTorch and Librosa, processing 7,000+ audio samples with MFCCs, spectral entropy, and Mel spectrograms.',
    metric: {
      value: '1st',
      label: 'out of 500+ participants in UMD ML Competition · 95% F1-score with vision transformers',
    },
    stack: ['PyTorch', 'Scikit-learn', 'Librosa', 'Keras'],
  },
  {
    index: '02',
    nameLines: ['Poisson', 'Disk', 'Sequences'],
    italicLine: 1,
    description:
      "Bridson's Poisson-Disk sampling algorithm in Rust generating distance-constrained 2D point distributions for procedural content generation. Optimized spatial grid structures for linear runtime, compiled to WebAssembly for in-browser visualization.",
    metric: {
      value: '<3s',
      label: 'in-browser render via WebAssembly · linear runtime with optimized spatial grids',
    },
    stack: ['Rust', 'WebAssembly'],
  },
  {
    index: '03',
    nameLines: ['Palette', 'Canvas', 'AI'],
    italicLine: 1,
    description:
      'Chrome extension providing automated academic insights within Canvas LMS. Privacy-first: all data is processed on-device via a locally hosted LLM. No user data ever leaves the browser.',
    metric: {
      value: '100+',
      label: 'active student users · zero server-side data processing',
    },
    stack: ['React', 'Node.js', 'Docker'],
  },
]
