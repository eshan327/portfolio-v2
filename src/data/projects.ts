import type { Project } from '@/types'

export const PROJECTS: Project[] = [
  {
    index: '01',
    nameLines: ['Auditory', 'Intent', 'Classifier'],
    italicLine: 1,
    description:
      'Built an end-to-end pipeline classifying expressive intent from nonverbal vocalizations for autism research. Engineered feature extraction and model training over 7,000+ samples with PyTorch and Librosa.',
    metric: {
      value: '1st',
      label: 'UMD ML Competition, 500+ participants · 95% F1-score with vision transformers',
    },
    stack: ['PyTorch', 'Scikit-learn', 'Librosa', 'Keras'],
  },
  {
    index: '02',
    nameLines: ['Poisson', 'Disk', 'Sequences'],
    italicLine: 1,
    description:
      "Implemented Bridson's Poisson-disk sampling in Rust for distance-constrained 2D generation. Optimized spatial grids for near-linear runtime and compiled to WebAssembly for interactive in-browser visualization.",
    metric: {
      value: '<3s',
      label: 'WebAssembly in-browser render · near-linear runtime with optimized spatial grids',
    },
    stack: ['Rust', 'WebAssembly'],
  },
  {
    index: '03',
    nameLines: ['Palette', 'Canvas', 'AI'],
    italicLine: 1,
    description:
      'Built a Chrome extension that delivers academic insights inside Canvas LMS using a local LLM pipeline. Designed a privacy-first architecture where all analysis runs on-device.',
    metric: {
      value: '100+',
      label: 'active student users · zero server-side data processing by design',
    },
    stack: ['React', 'Node.js', 'Docker'],
  },
]
